/**
 * Block
 */
 ( function( blocks, i18n, element) {
	var el = element.createElement;
    var __ = i18n.__;

	blocks.registerBlockType( 'php-everywhere-block/php', {
		title: __( 'PHP Everywhere' ),
		description: __( 'Add custom PHP code.' ),
		icon: 'editor-code',
		category: 'formatting',
		attributes: {
			code: {
				type: 'string',
			}
		},
		edit: function( props ) {
			return el( wp.blockEditor.Warning, {
				children: __( 'You are not authorized to edit the PHP Everywhere block. You are therefore blocked from saving this post / page. Contact your administrator to request edit permissions. Removing this block will allow you to save this post / page again.' ),
				actions: [
					el( wp.components.Button, {
						className: "php-everywhere-block remove-button",
						onClick: () => props.onReplace( [] ),
						children: __("Remove this block"),
					}),
					el( wp.components.Button, {
						className: "php-everywhere-block more-info-button",
						onClick: () => window.open('/wp-admin/edit.php?page=php-everywhere-block-more-info', '_blank').focus(),
						children: __("More information"),
					})
				],
			} );
		},
		save: function( properties ) {
			return null;
		},
	} );
}(
	window.wp.blocks,
	window.wp.i18n,
    window.wp.element
) );