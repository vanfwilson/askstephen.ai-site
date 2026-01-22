<?php
namespace Ens\Flow;

use DateTime;
use Ens\Config;
use Ens\Email\EmailSender;

/**
 * Class FlowManager
 *
 * @package Ens\Flow
 *
 * @since 1.0.0
 */
class FlowManager {

    protected $identifier;

    /**
     * FlowManager constructor.
     *
     * @since 1.0.0
     *
     * @param string $identifier The identifier.
     */
    public function __construct($identifier) {
        $this->identifier = $identifier;
    }

    /**
     * Handle the action.
     *
     * @since 1.0.0
     *
     * @param string $action The name of the action.
     * @param array  $data   The data associated with the action.
     */
    public function handle( $action, $data ) {
        $prefix_for_cpt = $this->identifier;
        $post_type      = $prefix_for_cpt . '-flow';

        $meta_key = '_' . $prefix_for_cpt . '_notification_flow_trigger';

        $flows = get_posts( [
            'post_type'   => $post_type,
            'meta_key'    => $meta_key,
            'meta_value'  => $action,
            'post_status' => 'publish',
        ] );

        if ( empty( $flows ) || !is_array( $flows ) ) {
            return;
        }

        foreach ( $flows as $flow ) {
            if ( !isset( $flow->ID ) ) {
                continue;
            }

            $flow_config = get_post_meta( $flow->ID, '_' . $prefix_for_cpt . '_notification_flow_flow_config', true );

            if ( empty( $flow_config ) || !is_array( $flow_config ) ) {
                continue;
            }

            $this->execute_flow( $flow_config, $data, $action, null, $flow->ID );
        }
    }

    /**
     * Resume flow callback.
     *
     * @since 1.0.0
     *
     * @param int    $flow_id     The ID of the flow.
     * @param string $resume_time The resume time.
     */
    public function resume_flow_callback( $flow_id, $resume_time ) {
        $prefix_for_cpt = $this->identifier;
        
        if ( !$flow_id || !$resume_time ) {
            return;
        }

        $checkpoint = $this->get_user_flow_checkpoint( $resume_time, $flow_id );

        if ( empty( $checkpoint ) || !is_array( $checkpoint ) ) {
            return;
        }

        if ( !isset( $checkpoint['resume_after'] ) || time() < $checkpoint['resume_after'] ) {
            return;
        }

        if ( !isset( $checkpoint['flow_snapshot'] ) || !isset( $checkpoint['hook_data'] ) ) {
            return;
        }

        
        $hook_data   = $checkpoint['hook_data'];
        $resume_node = $checkpoint['resume_node'] ?? null;
        $action = $checkpoint['action'];
        $flow_post_id = $checkpoint['flow_post_id'] ?? null;
        $flow = get_post_meta( $flow_post_id, '_' . $prefix_for_cpt . '_notification_flow_flow_config', true );

        $this->execute_flow( $flow, $hook_data, $action, null, $flow_post_id );
    }

    /**
     * Execute a flow.
     *
     * @since 1.0.0
     *
     * @param array $flow         The flow data.
     * @param array $hook_data    The hook data.
     * @param string $action      The action name.
     * @param string|null $resume_from_id The node ID to resume from.
     * @param int|null $flow_post_id The flow post ID.
     */
    public function execute_flow( $flow, $hook_data, $action, $resume_from_id = null, $flow_post_id = null ) {
        if ( !isset( $flow['nodes'] ) || !is_array( $flow['nodes'] ) ||
            !isset( $flow['edges'] ) || !is_array( $flow['edges'] ) ) {
            return;
        }

        $nodes = $flow['nodes'];
        $edges = $flow['edges'];

        // Build node map with validation
        $node_map = [];
        foreach ( $nodes as $node ) {
            if ( !isset( $node['id'], $node['name'] ) ) {
                continue;
            }
            $node_map[$node['id']] = $node;
        }

        $start_node_id = $resume_from_id ?? $this->find_trigger_node( $nodes );
        if ( !$start_node_id || !isset( $node_map[$start_node_id] ) ) {
            return;
        }

        $current_node_id = $start_node_id;

        while ( $current_node_id && isset( $node_map[$current_node_id] ) ) {
            $node = $node_map[$current_node_id];
            switch ( $node['name'] ) {
            case 'trigger':
                $current_node_id = $this->get_next_node_id( $edges, $node['id'] );
                break;

            case 'condition':
                if ( !isset( $node['data'] ) || !is_array( $node['data'] ) ) {
                    $current_node_id = null;
                    break;
                }

                $field    = $node['data']['field'] ?? null;
                $operator = $node['data']['operator'] ?? null;
                $value    = $node['data']['value'] ?? null;

                $field_value = $hook_data[$field] ?? null;

                if ( $field === null || $operator === null ) {
                    $current_node_id = null;
                    break;
                }
                
                if(is_numeric($value) && $value > 9999999999 && isset($hook_data[$field.'_timestamp'])){
                    $field_value = $hook_data[$field.'_timestamp'];

                    $timestamp = (int) ($value / 1000);

                    // Create DateTime object in WordPress timezone
                    $dt = (new DateTime("@$timestamp"))->setTimezone(wp_timezone());

                    // For comparison: get timestamp in WordPress timezone
                    $value = $dt->getTimestamp();
                }
                if(is_string($value)){
                    $field_value = strtolower(preg_replace('/[^\w]/', '', trim($field_value)));
                    $value = strtolower(preg_replace('/[^\w]/', '', trim($value)));
                }

                $is_true         = $this->compare_values( $field_value, $operator, $value );
                $lebel           = $is_true ? 'true' : 'false';
                $current_node_id = $this->get_next_node_id(
                    $edges,
                    $node['id'],
                    $lebel
                );
                break;

            case 'delay':
                if ( !isset( $node['data'] ) || !is_array( $node['data'] ) ) {
                    $current_node_id = null;
                    break;
                }

                $delayUnit            = $node['data']['delayUnit'] ?? 'seconds';
                $delay                = isset( $node['data']['delay'] ) ? (int) $node['data']['delay'] : 60;

                $delay_depeneds_on    = $node['data']['delayCondition'] ?? null;
                $delay_condition      = 'after';
                $dependent_key        = $delay_depeneds_on;
                

                if(str_contains( $delay_depeneds_on, 'before' )) {
                    $delay_condition = 'before';
                    $dependent_key   = str_replace( 'before_', '', $delay_depeneds_on );
                }
                if(str_contains( $delay_depeneds_on, 'after' )) {
                    $delay_condition = 'after';
                    $dependent_key   = str_replace( 'after_', '', $delay_depeneds_on );
                }

                if(isset( $hook_data[$dependent_key.'_timestamp'] )) {
                    $dependent_key = $dependent_key.'_timestamp';
                }

                $dependency_value     = isset( $hook_data[$dependent_key] ) ? ( $hook_data[$dependent_key] ?? current_time( 'timestamp' ) ) : current_time( 'timestamp' );

                $general_prefix = $this->identifier;

                // Calculate seconds based on unit
                $seconds = $delay;
                switch ( $delayUnit ) {
                case 'minutes':
                    $seconds *= 60;
                    break;
                case 'hours':
                    $seconds *= 60 * 60;
                    break;
                case 'days':
                    $seconds *= 60 * 60 * 24;
                    break;
                }

                // Calculate resume time
                $resume_time = ( $delay_condition == 'before' ) ?
                $dependency_value - $seconds :
                $dependency_value + $seconds;

                $next_node_id = $this->get_next_node_id( $edges, $node['id'] );
                if ( !$next_node_id ) {
                    $current_node_id = null;
                    break;
                }

                // Check if resume time has already passed
                if ( time() >= $resume_time ) {
                    // Resume time has passed, move to the next node immediately
                    $current_node_id = $next_node_id;
                    break;
                }

                $flow_id = uniqid( 'flow_', true );

                

                $post_id = $hook_data['post_id'] ?? null;

                if ( $post_id && isset( $hook_data['previous_'.$dependent_key] ) ) {
                    $previous_resume_time = $hook_data['previous_'.$dependent_key];
                    $previous_resume_time = ( $delay_condition == 'before' ) ? $previous_resume_time - $seconds : $previous_resume_time + $seconds;

                    if( $previous_resume_time != $resume_time ) {
                        $hook = $general_prefix . '_resume_flow_after_delay';
                        $previous_flow_id = get_post_meta( $post_id, 'ens_flow_id', true );

                        if(wp_next_scheduled( $hook, [ 'flow_id' => $previous_flow_id, 'resume_time' => $previous_resume_time ] )){
                            $key = sprintf( 'flow_checkpoint_%s_%s', $previous_flow_id, $previous_resume_time );
                            delete_transient( $key );
                            wp_clear_scheduled_hook( $hook, [ 'flow_id' => $previous_flow_id, 'resume_time' => $previous_resume_time ] ); 
                        }
                    }
                }

                if(isset( $post_id )) {
                    update_post_meta( $post_id, 'ens_flow_id', $flow_id );
                }

                // Save checkpoint
                $this->save_user_flow_checkpoint( $resume_time, $flow_id, [
                    'resume_node'   => $next_node_id,
                    'resume_after'  => $resume_time,
                    'flow_snapshot' => $flow,
                    'hook_data'     => $hook_data,
                     'action'        => $action,
                    'flow_post_id'  => $flow_post_id
                ] );

                
                // Debug information
                $hook_name = $general_prefix . '_resume_flow_after_delay';
                $current_time = time();
                $time_diff = $resume_time - $current_time;

                // Schedule resume
                $scheduled_event = wp_schedule_single_event(
                    $resume_time,
                    $hook_name,
                    [
                        'flow_id'     => $flow_id,
                        'resume_time' => $resume_time,
                    ]
                );

                // Verify if event was actually scheduled
                $next_scheduled = wp_next_scheduled($hook_name, ['flow_id' => $flow_id, 'resume_time' => $resume_time]);

                return; // Pause execution

            case 'email':
                if ( !isset( $node['data'] ) || !is_array( $node['data'] ) ) {
                    $current_node_id = null;
                    break;
                }

                // Check session_id tracking
                $session_id = $hook_data['session_id'] ?? null;
                $processed_session_ids = $node['data']['processed_session_ids'] ?? [];

                $should_send_email = true;

                if ( $session_id && in_array( $session_id, $processed_session_ids ) ) {
                    // Session already processed, skip sending
                    $should_send_email = false;
                }

                if ( $should_send_email ) {
                    $receiverType = $node['data']['receiverType'] ?? null;
                    if ( $receiverType && isset( $hook_data[$receiverType] ) ) {
                        $user_email = $hook_data[$receiverType];
                        $user_email = apply_filters( 'notification_sdk_to_emails', $hook_data[$receiverType], $hook_data, $action );

                        if(is_array( $user_email )) {
                            foreach ( $user_email as $key=>$email ) {
                                $this->send_email_to_user( $receiverType, $email, $node['data'], $hook_data, $action,$key );
                            }
                        }
                        else{
                            $this->send_email_to_user( $receiverType, $user_email, $node['data'], $hook_data, $action );
                        }
                    }

                    // Add session_id to processed list and update database
                    if ( $session_id && $flow_post_id ) {
                        $processed_session_ids[] = $session_id;
                        $this->update_node_processed_sessions( $flow_post_id, $node['id'], $processed_session_ids );
                    }
                }

                $current_node_id = $this->get_next_node_id( $edges, $node['id'] );
                break;

            case 'end':
                // Remove current session_id from all email nodes
                $session_id = $hook_data['session_id'] ?? null;
                if ( $session_id && $flow_post_id ) {
                    $this->remove_session_from_flow( $flow_post_id, $session_id, $nodes );
                }
                return;

            default:
                $current_node_id = $this->get_next_node_id( $edges, $node['id'] );
                break;
            }
        }
    }

    /**
     * Compare values with type safety.
     *
     * @since 1.0.0
     *
     * @param mixed  $left     The left value.
     * @param string $operator The operator.
     * @param mixed  $right    The right value.
     *
     * @return bool
     */
    public function compare_values( $left, $operator, $right ) {
        if ( $operator === null ) {
            return false;
        }
        switch ( $operator ) {
        case '=':
            return $left == $right;
        case 'not_equal':
            return $left != $right;
        case 'greater_than':
            if ( !is_numeric( $left ) || !is_numeric( $right ) ) {
                return false;
            }

            return $left > $right;
        case 'less_than':
            if ( !is_numeric( $left ) || !is_numeric( $right ) ) {
                return false;
            }

            return $left < $right;
        case 'greater_equal':
            if ( !is_numeric( $left ) || !is_numeric( $right ) ) {
                return false;
            }

            return $left >= $right;
        case 'less_equal':
            if ( !is_numeric( $left ) || !is_numeric( $right ) ) {
                return false;
            }

            return $left <= $right;
        default:return false;
        }
    }

    /**
     * Find trigger node in nodes array.
     *
     * @since 1.0.0
     *
     * @param array $nodes The nodes array.
     *
     * @return string|null
     */
    public function find_trigger_node( $nodes ) {
        foreach ( $nodes as $node ) {
            if ( isset( $node['name'] ) && $node['name'] === 'trigger' && isset( $node['id'] ) ) {
                return $node['id'];
            }
        }
        return null;
    }

    /**
     * Get next node ID from edges.
     *
     * @since 1.0.0
     *
     * @param array  $edges   The edges array.
     * @param string $from_id The source node ID.
     * @param string|null $label The edge label (optional).
     *
     * @return string|null
     */
    public function get_next_node_id( $edges, $from_id, $label = null ) {
        foreach ( $edges as $edge ) {
            if ( !isset( $edge['source'], $edge['target'] ) ) {
                continue;
            }

            if ( $edge['source'] === $from_id ) {
                if ( $label === null || ( isset( $edge['label'] ) && $edge['label'] === $label ) ) {
                    return $edge['target'];
                }
            }
        }
        return null;
    }

    /**
     * Save user flow checkpoint.
     *
     * @since 1.0.0
     *
     * @param int    $resume_time The timestamp to resume at.
     * @param string $flow_id     The flow ID.
     * @param array  $data        The checkpoint data.
     */
    public function save_user_flow_checkpoint( $resume_time, $flow_id, $data ) {
        if ( empty( $data ) || !isset( $data['resume_after'] ) ) {
            return;
        }

        // Set a minimum expiration of 1 hour and maximum of 30 days
        $expiration = max( HOUR_IN_SECONDS, min( $data['resume_after'] - time() + DAY_IN_SECONDS, 30 * DAY_IN_SECONDS ) );
        $key = sprintf( 'flow_checkpoint_%s_%s', $flow_id, $resume_time );
        
        // Store the flow_id and resume_time in the data for verification
        $data['_flow_id'] = $flow_id;
        $data['_resume_time'] = $resume_time;
        
        // Store the current timestamp to help with debugging
        $data['_saved_at'] = time();
        
        set_transient( $key, $data, $expiration );
    }

    /**
     * Get user flow checkpoint.
     *
     * @since 1.0.0
     *
     * @param int    $resume_time The resume time.
     * @param string $flow_id     The flow ID.
     *
     * @return array|null
     */
    public function get_user_flow_checkpoint( $resume_time, $flow_id ) {
        $key = sprintf( 'flow_checkpoint_%s_%s', $flow_id, $resume_time );
        $checkpoint = get_transient( $key );
        
        if (!is_array($checkpoint)) {
            // Log additional debug info
            return null;
        }
        
        // Verify the flow_id and resume_time match what we expect
        if (($checkpoint['_flow_id'] ?? '') !== $flow_id || 
            ($checkpoint['_resume_time'] ?? 0) != $resume_time) {
            return null;
        }
        
        return $checkpoint;
    }
    
    /**
     * Send email to user with validation.
     *
     * @since 1.0.0
     *
     * @param string $receiverType The type of receiver.
     * @param string $email The recipient email.
     * @param array $data The email data.
     * @param array $action_data The action data.
     * @param string $action_name The action name.
     * @param int $count The email count.
     */
    public function send_email_to_user( $receiverType, $email, $data, $action_data, $action_name, $count = 0 ) {
        if ( !filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
            return;
        }

        $from = $data['from'] ?? '';
        $subject = $data['subject'] ?? '';
        $body = $data['body'] ?? '';

        if ( empty( $subject ) ) {
            return;
        }

        $email_sender = new EmailSender( $action_name, $receiverType, $email, $from, $subject, $body, $action_data, $count );
        $email_sender->send();
    }

    /**
     * Update node's processed session IDs in database.
     *
     * @since 1.0.0
     *
     * @param int    $flow_post_id         The flow post ID.
     * @param string $node_id              The node ID to update.
     * @param array  $processed_session_ids The array of processed session IDs.
     */
    public function update_node_processed_sessions( $flow_post_id, $node_id, $processed_session_ids ) {
        if ( !$flow_post_id || !$node_id ) {
            return;
        }

        $prefix_for_cpt = $this->identifier;
        $meta_key = '_' . $prefix_for_cpt . '_notification_flow_flow_config';

        $flow_config = get_post_meta( $flow_post_id, $meta_key, true );

        if ( empty( $flow_config ) || !is_array( $flow_config ) || !isset( $flow_config['nodes'] ) ) {
            return;
        }

        // Find and update the specific node
        foreach ( $flow_config['nodes'] as &$node ) {
            if ( isset( $node['id'] ) && $node['id'] === $node_id ) {
                if ( !isset( $node['data'] ) || !is_array( $node['data'] ) ) {
                    $node['data'] = [];
                }
                $node['data']['processed_session_ids'] = $processed_session_ids;
                break;
            }
        }

        // Update the flow config in database
        update_post_meta( $flow_post_id, $meta_key, $flow_config );
    }

    /**
     * Remove session ID from all email nodes in the flow.
     *
     * @since 1.0.0
     *
     * @param int    $flow_post_id The flow post ID.
     * @param string $session_id   The session ID to remove.
     * @param array  $nodes        The nodes array.
     */
    public function remove_session_from_flow( $flow_post_id, $session_id, $nodes ) {
        if ( !$flow_post_id || !$session_id || empty( $nodes ) ) {
            return;
        }

        $prefix_for_cpt = $this->identifier;
        $meta_key = '_' . $prefix_for_cpt . '_notification_flow_flow_config';

        $flow_config = get_post_meta( $flow_post_id, $meta_key, true );

        if ( empty( $flow_config ) || !is_array( $flow_config ) || !isset( $flow_config['nodes'] ) ) {
            return;
        }

        $updated = false;

        // Loop through all nodes and remove session_id from email nodes
        foreach ( $flow_config['nodes'] as &$node ) {
            if ( isset( $node['name'] ) && $node['name'] === 'email' &&
                 isset( $node['data']['processed_session_ids'] ) &&
                 is_array( $node['data']['processed_session_ids'] ) ) {

                $key = array_search( $session_id, $node['data']['processed_session_ids'] );
                if ( $key !== false ) {
                    unset( $node['data']['processed_session_ids'][$key] );
                    // Re-index array
                    $node['data']['processed_session_ids'] = array_values( $node['data']['processed_session_ids'] );
                    $updated = true;
                }
            }
        }

        // Only update if we made changes
        if ( $updated ) {
            update_post_meta( $flow_post_id, $meta_key, $flow_config );
        }
    }
}