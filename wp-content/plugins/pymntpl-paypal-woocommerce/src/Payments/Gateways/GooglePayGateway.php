<?php

namespace PaymentPlugins\WooCommerce\PPCP\Payments\Gateways;

use PaymentPlugins\WooCommerce\PPCP\ProductSettings;
use PaymentPlugins\WooCommerce\PPCP\Tokens\CreditCardToken;
use PaymentPlugins\WooCommerce\PPCP\Traits\CardPaymentNoteTrait;
use PaymentPlugins\WooCommerce\PPCP\Traits\DisplayItemsTrait;
use PaymentPlugins\WooCommerce\PPCP\Traits\ThreeDSecureTrait;
use PaymentPlugins\WooCommerce\PPCP\Traits\TokenizationTrait;
use PaymentPlugins\WooCommerce\PPCP\Utils;

class GooglePayGateway extends AbstractGateway {

	use TokenizationTrait;
	use ThreeDSecureTrait;
	use DisplayItemsTrait;
	use CardPaymentNoteTrait;

	public $id = 'ppcp_googlepay';

	protected $template = 'googlepay.php';

	protected $token_class = CreditCardToken::class;

	protected $tab_label_priority = 50;

	protected $payment_method_type = 'google_pay';

	private $supported_locales = [
		'en',
		'ar',
		'bg',
		'ca',
		'cs',
		'da',
		'de',
		'el',
		'es',
		'et',
		'fi',
		'fr',
		'hr',
		'id',
		'it',
		'ja',
		'ko',
		'ms',
		'nl',
		'no',
		'pl',
		'pt',
		'ru',
		'sk',
		'sl',
		'sr',
		'sv',
		'th',
		'tr',
		'uk',
		'zh'
	];

	private $supported_currencies = [
		'AUD',
		'BRL',
		'CAD',
		'CHF',
		'CZK',
		'DKK',
		'EUR',
		'GBP',
		'HKD',
		'HUF',
		'ILS',
		'JPY',
		'MXN',
		'NOK',
		'NZD',
		'PHP',
		'PLN',
		'SEK',
		'SGD',
		'THB',
		'TWD',
		'USD'
	];

	public function __construct( ...$args ) {
		parent::__construct( ...$args );
		$this->method_title       = __( 'Google Pay Gateway By Payment Plugins', 'pymntpl-paypal-woocommerce' );
		$this->tab_label          = __( 'PayPal Google Pay Settings', 'pymntpl-paypal-woocommerce' );
		$this->icon               = $this->assets->assets_url( 'assets/img/googlepay/' . $this->get_option( 'icon' ) . '.svg' );
		$this->method_description = __( 'Offer Google Pay through PayPal', 'pymntpl-paypal-woocommerce' );
		$this->order_button_text  = $this->get_option( 'order_button_text' );
	}

	public function init_supports( $supports = [] ) {
		parent::init_supports( $supports );
		$unsupported    = [
			'tokenization',
			'add_payment_method',
			'subscriptions',
			'subscription_cancellation',
			'multiple_subscriptions',
			'subscription_amount_changes',
			'subscription_date_changes',
			'pre-orders',
			'subscription_payment_method_change_admin',
			'subscription_reactivation',
			'subscription_suspension',
			'subscription_payment_method_change_customer',
		];
		$this->supports = array_diff( $this->supports, $unsupported );
	}

	public function init_form_fields() {
		$this->form_fields = [
			'enabled'            => [
				'title'       => __( 'Enabled', 'pymntpl-paypal-woocommerce' ),
				'type'        => 'checkbox',
				'default'     => 'no',
				'value'       => 'yes',
				'desc_tip'    => true,
				'description' => __( 'Enable this option to offer PayPal on your site.', 'pymntpl-paypal-woocommerce' )
			],
			'title_text'         => [
				'title'       => __( 'Title', 'pymntpl-paypal-woocommerce' ),
				'type'        => 'text',
				'default'     => __( 'Google Pay', 'pymntpl-paypal-woocommerce' ),
				'desc_tip'    => true,
				'description' => __( 'This is the title of the payment gateway which appears on the checkout page.', 'pymntpl-paypal-woocommerce' )
			],
			'description'        => [
				'title'       => __( 'Description', 'pymntpl-paypal-woocommerce' ),
				'type'        => 'text',
				'default'     => '',
				'desc_tip'    => true,
				'description' => __( 'This is the description that appears when the payment gateway is selected on the checkout page.', 'pymntpl-paypal-woocommerce' )
			],
			'intent'             => [
				'type'        => 'select',
				'class'       => 'wc-enhanced-select',
				'title'       => __( 'Transaction Type', 'pymntpl-paypal-woocommerce' ),
				'default'     => 'capture',
				'options'     => [
					'capture'   => __( 'Capture', 'pymntpl-paypal-woocommerce' ),
					'authorize' => __( 'Authorize', 'pymntpl-paypal-woocommerce' ),
				],
				'desc_tip'    => true,
				'description' => __(
					'If set to capture, funds will be captured immediately during checkout. Authorized transactions put a hold on the customer\'s funds but
						no payment is taken until the charge is captured. Authorized charges can be captured on the Admin Order page.',
					'pymntpl-paypal-woocommerce'
				),
			],
			'authorize_status'   => [
				'type'              => 'select',
				'class'             => 'wc-enhanced-select',
				'title'             => __( 'Authorized Order Status', 'pymntpl-paypal-woocommerce' ),
				'default'           => 'wc-on-hold',
				'options'           => function_exists( 'wc_get_order_statuses' )
					? wc_get_order_statuses()
					: [
						'wc-pending'    => _x( 'Pending payment', 'Order status', 'woocommerce' ),
						'wc-processing' => _x( 'Processing', 'Order status', 'woocommerce' ),
						'wc-on-hold'    => _x( 'On hold', 'Order status', 'woocommerce' ),
						'wc-completed'  => _x( 'Completed', 'Order status', 'woocommerce' ),
						'wc-cancelled'  => _x( 'Cancelled', 'Order status', 'woocommerce' ),
						'wc-refunded'   => _x( 'Refunded', 'Order status', 'woocommerce' ),
						'wc-failed'     => _x( 'Failed', 'Order status', 'woocommerce' ),
					],
				'custom_attributes' => [
					'data-show-if' => 'intent=authorize'
				],
				'desc_tip'          => true,
				'description'       => __( 'If the transaction is authorized, this is the status applied to the order.', 'pymntpl-paypal-woocommerce' )
			],
			/*'merchant_name'      => [
				'title'       => __( 'Merchant Name', 'pymntpl-paypal-woocommerce' ),
				'type'        => 'text',
				'default'     => '',
				'desc_tip'    => true,
				'description' => __( 'Merchant name encoded as UTF-8. Merchant name is rendered in the payment sheet. In TEST environment, or if a merchant isn\'t recognized, a “Pay Unverified Merchant” message is displayed 
				in the payment sheet.', 'pymntpl-paypal-woocommerce' )
			],*/
			'order_button_text'  => [
				'title'       => __( 'Button Text', 'pymntpl-paypal-woocommerce' ),
				'type'        => 'text',
				'default'     => '',
				'desc_tip'    => true,
				'description' => __( 'The text for the Place Order button when PayPal is selected. Leave blank to use the default WooCommerce text.',
					'pymntpl-paypal-woocommerce' )

			],
			'sections'           => [
				'title'             => __( 'Google Pay Payment Sections', 'pymntpl-paypal-woocommerce' ),
				'type'              => 'multiselect',
				'class'             => 'wc-enhanced-select',
				'default'           => [ 'cart', 'checkout', 'order_pay' ],
				'options'           => [
					'checkout'         => __( 'Checkout Page', 'pymntpl-paypal-woocommerce' ),
					'product'          => __( 'Product Page', 'pymntpl-paypal-woocommerce' ),
					'cart'             => __( 'Cart Page', 'pymntpl-paypal-woocommerce' ),
					'minicart'         => __( 'Minicart', 'pymntpl-paypal-woocommerce' ),
					'express_checkout' => __( 'Express Checkout', 'pymntpl-paypal-woocommerce' ),
					'order_pay'        => __( 'Order Pay', 'pymntpl-paypal-woocommerce' )
				],
				'sanitize_callback' => function ( $value ) {
					return ! is_array( $value ) ? [] : $value;
				},
				'desc_tip'          => true,
				'description'       => __( 'These are the sections that the Google Pay payment button will appear. If Google Pay is enabled, the button will show on the checkout page by default.', 'pymntpl-paypal-woocommerce' )
			],
			'payment_format'     => [
				'title'       => __( 'Payment Method Format', 'pymntpl-paypal-woocommerce' ),
				'type'        => 'select',
				'default'     => 'type_ending_in',
				'options'     => wp_list_pluck( $this->get_payment_method_token_instance()->get_payment_method_formats(), 'example' ),
				'desc_tip'    => true,
				'description' => __( 'This option controls how the PayPal payment method appears on the frontend.', 'pymntpl-paypal-woocommerce' )
			],
			'checkout_placement' => [
				'title'       => __( 'Checkout page Button Placement', 'pymntpl-paypal-woocommerce' ),
				'type'        => 'select',
				'options'     => [
					'place_order'    => __( 'Place Order Button', 'pymntpl-paypal-woocommerce' ),
					'payment_method' => __( 'In payment gateway section', 'pymntpl-paypal-woocommerce' )
				],
				'default'     => 'place_order',
				'desc_tip'    => true,
				'description' => __( 'You can choose to render the Google Pay button in either the payment method section of the checkout page or where the Place Order button is rendered.', 'pymntpl-paypal-woocommerce' )
			],
			'icon'               => [
				'title'       => __( 'Icon', 'pymntpl-paypal-woocommerce' ),
				'type'        => 'select',
				'options'     => [
					'googlepay_round_outline' => __( 'With Rounded Outline', 'pymntpl-paypal-woocommerce' ),
					'googlepay_outline'       => __( 'With Outline', 'pymntpl-paypal-woocommerce' ),
					'googlepay_standard'      => __( 'Standard', 'pymntpl-paypal-woocommerce' ),
				],
				'default'     => 'googlepay_round_outline',
				'desc_tip'    => true,
				'description' => __( 'This is the icon style that appears next to the gateway on the checkout page.', 'pymntpl-paypal-woocommerce' ),
			],
			'3ds_title'          => [
				'type'  => 'title',
				'title' => __( '3D Secure Options', 'pymntpl-paypal-woocommerce' ),
			],
			'3ds_enabled'        => [
				'title'       => __( 'Enable 3DS', 'pymntpl-paypal-woocommerce' ),
				'type'        => 'checkbox',
				'default'     => 'yes',
				'value'       => 'yes',
				'desc_tip'    => true,
				'description' => __( 'When enabled, 3DS will be triggered when required.', 'pymntpl-paypal-woocommerce' )
			],
			'3ds_forced'         => [
				'title'             => __( 'Force 3DS', 'pymntpl-paypal-woocommerce' ),
				'type'              => 'checkbox',
				'default'           => 'no',
				'value'             => 'yes',
				'desc_tip'          => true,
				'description'       => __( 'When enabled, 3DS forced for all transactions when supported.', 'pymntpl-paypal-woocommerce' ),
				'custom_attributes' => [
					'data-show-if' => '3ds_enabled=true'
				],
			],
			'button_section'     => [
				'type'  => 'title',
				'title' => __( 'Button Options', 'pymntpl-paypal-woocommerce' ),
			],
			'button_color'       => [
				'title'       => __( 'Button Color', 'pymntpl-paypal-woocommerce' ),
				'type'        => 'select',
				'class'       => 'wc-enhanced-select',
				'options'     => [
					'default' => __( 'Default', 'pymntpl-paypal-woocommerce' ),
					'black'   => __( 'Black', 'pymntpl-paypal-woocommerce' ),
					'white'   => __( 'White', 'pymntpl-paypal-woocommerce' ),
				],
				'default'     => 'default',
				'desc_tip'    => true,
				'description' => __( 'The color of the Google Pay button.', 'pymntpl-paypal-woocommerce' ),
			],
			'button_type'        => [
				'title'       => __( 'Button Type', 'pymntpl-paypal-woocommerce' ),
				'type'        => 'select',
				'class'       => 'wc-enhanced-select',
				'options'     => [
					'buy'       => __( 'Buy', 'pymntpl-paypal-woocommerce' ),
					'plain'     => __( 'Plain', 'pymntpl-paypal-woocommerce' ),
					'checkout'  => __( 'Checkout', 'pymntpl-paypal-woocommerce' ),
					'order'     => __( 'Order', 'pymntpl-paypal-woocommerce' ),
					'pay'       => __( 'Pay', 'pymntpl-paypal-woocommerce' ),
					'donate'    => __( 'Donate', 'pymntpl-paypal-woocommerce' ),
					'book'      => __( 'Book', 'pymntpl-paypal-woocommerce' ),
					'subscribe' => __( 'Subscribe', 'pymntpl-paypal-woocommerce' ),
				],
				'default'     => 'buy',
				'desc_tip'    => true,
				'description' => __( 'The type/text of the Google Pay button.', 'pymntpl-paypal-woocommerce' ),
			],
			'button_border'      => [
				'title'       => __( 'Button Border Type', 'pymntpl-paypal-woocommerce' ),
				'type'        => 'select',
				'class'       => 'wc-enhanced-select',
				'options'     => [
					'no_border'      => __( 'No Border', 'pymntpl-paypal-woocommerce' ),
					'default_border' => __( 'Border', 'pymntpl-paypal-woocommerce' ),
				],
				'default'     => 'default_border',
				'desc_tip'    => true,
				'description' => __( 'The border type of the Google Pay button.', 'pymntpl-paypal-woocommerce' ),
			],
			'button_size'        => [
				'title'       => __( 'Button Size Mode', 'pymntpl-paypal-woocommerce' ),
				'type'        => 'select',
				'class'       => 'wc-enhanced-select',
				'options'     => [
					'static' => __( 'Static', 'pymntpl-paypal-woocommerce' ),
					'fill'   => __( 'Fill', 'pymntpl-paypal-woocommerce' ),
				],
				'default'     => 'fill',
				'desc_tip'    => true,
				'description' => __( 'Static buttons have a fixed width and height. Fill buttons expand to fill the width of their container.', 'pymntpl-paypal-woocommerce' ),
			],
			'button_radius'      => [
				'title'             => __( 'Button Radius', 'pymntpl-paypal-woocommerce' ),
				'type'              => 'number',
				'default'           => '4',
				'custom_attributes' => [
					'min'  => '0',
					'step' => '1'
				],
				'desc_tip'          => true,
				'description'       => __( 'The border radius of the button in pixels. Must be a non-negative integer.', 'pymntpl-paypal-woocommerce' ),
				'sanitize_callback' => function ( $value ) {
					if ( ! preg_match( '/^[\d]+$/', $value ) ) {
						$value = 0;
					}

					return absint( $value );
				}
			],
			'button_height'      => [
				'type'              => 'slider',
				'title'             => __( 'Button Height', 'pymntpl-paypal-woocommerce' ),
				'default'           => 40,
				'custom_attributes' => [
					'data-height-min'  => 25,
					'data-height-max'  => 55,
					'data-height-step' => 1,
				]
			],
		];
	}

	public function get_admin_script_dependencies() {
		$this->assets->register_script(
			'wc-ppcp-gpay-settings',
			'build/js/googlepay-settings.js',
			[
				'jquery-ui-sortable',
				'jquery-ui-widget',
				'jquery-ui-core',
				'jquery-ui-slider'
			]
		);

		return [ 'wc-ppcp-gpay-settings' ];
	}

	public function get_checkout_script_handles() {
		$this->assets->register_script(
			'wc-ppcp-googlepay-checkout',
			'build/js/googlepay-checkout.js',
			[ 'wc-ppcp-googlepay-external' ]
		);
		$this->tokenization_script();

		return [ 'wc-ppcp-googlepay-checkout' ];
	}

	public function get_express_checkout_script_handles() {
		$this->assets->register_script(
			'wc-ppcp-googlepay-express',
			'build/js/googlepay-express.js',
			[ 'wc-ppcp-googlepay-external' ]
		);
		$this->tokenization_script();

		return [ 'wc-ppcp-googlepay-express' ];
	}

	public function get_cart_script_handles() {
		$this->assets->register_script(
			'wc-ppcp-googlepay-cart',
			'build/js/googlepay-cart.js',
			[ 'wc-ppcp-googlepay-external' ]
		);

		return [ 'wc-ppcp-googlepay-cart' ];
	}

	public function get_product_script_handles() {
		$this->assets->register_script(
			'wc-ppcp-googlepay-product',
			'build/js/googlepay-product.js',
			[ 'wc-ppcp-googlepay-external' ]
		);

		return [ 'wc-ppcp-googlepay-product' ];
	}

	public function get_minicart_script_handles() {
		$this->assets->register_script(
			'wc-ppcp-googlepay-minicart',
			'build/js/googlepay-minicart.js',
			[ 'wc-ppcp-googlepay-external' ]
		);

		return [ 'wc-ppcp-googlepay-minicart' ];
	}

	public function express_checkout_fields() {
		?>
        <div id="wc-ppcp_googlepay-express-button"></div>
		<?php
	}

	/**
	 * @param $context
	 *
	 * @return array
	 */
	public function get_payment_method_data( $context ) {
		$data = [
			'title'                => $this->get_title(),
			'sections'             => $this->get_option( 'sections', [] ),
			'merchant_name'        => $this->get_option( 'merchant_name', get_bloginfo( 'name' ) ),
			'buttonPlacement'      => $this->get_option( 'checkout_placement', 'place_order' ),
			'i18n'                 => [
				'total_price_label' => __( 'Total', 'pymntpl-paypal-woocommerce' ),
				'unavailable'       => __( 'Google Pay is unavailable at this time.', 'pymntpl-paypal-woocommerce' ),
				'unavailable_admin' => __( 'Google Pay is unavailable at this time. Login to developer.paypal.com > Apps & Credentials and click your application. Under "Features" check "Google Pay".', 'pymntpl-paypal-woocommerce' )
			],
			'button'               => [
				'buttonColor'      => $this->get_option( 'button_color', 'default' ),
				'buttonType'       => $this->get_option( 'button_type', 'buy' ),
				'buttonBorderType' => $this->get_option( 'button_border', 'default_border' ),
				'buttonSizeMode'   => $this->get_option( 'button_size', 'fill' ),
				'buttonRadius'     => absint( $this->get_option( 'button_radius', 4 ) ),
				'buttonLocale'     => $this->get_payment_button_locale(),
				'buttonHeight'     => $this->get_option( 'button_height', 40 ) . 'px'
			],
			'total_price'          => 0,
			'display_items'        => [],
			'shipping_options'     => [],
			'shipping_method'      => $this->get_selected_shipping_method(),
			'currency_code'        => get_woocommerce_currency(),
			'country_code'         => WC()->countries ? WC()->countries->get_base_country() : wc_get_base_location()['country'],
			'supported_currencies' => $this->get_supported_currencies()
		];
		if ( $context->is_checkout() || $context->is_cart() || $context->is_shop() ) {
			$cart                     = WC()->cart;
			$data['total_price']      = wc_format_decimal( $cart->get_total( 'float' ), 2 );
			$data['display_items']    = $this->get_display_items_for_cart( $cart );
			$data['shipping_options'] = $this->get_shipping_options();
		} elseif ( $context->is_order_pay() ) {
			$order                    = $context->get_order_from_query();
			$data['currency_code']    = $order->get_currency();
			$data['total_price']      = wc_format_decimal( $order->get_total(), 2 );
			$data['display_items']    = $this->get_display_items_for_order( $order );
			$data['shipping_options'] = [];
		} elseif ( $context->is_product() ) {
			global $product;
			if ( ! $product instanceof \WC_Product ) {
				$product_id = Utils::get_queried_product_id();
				$product    = wc_get_product( $product_id );
			}
			if ( $product instanceof \WC_Product ) {
				$data['total_price']      = wc_format_decimal( wc_get_price_to_display( $product ), 2 );
				$data['display_items']    = $this->get_display_items_for_product( $product );
				$data['shipping_options'] = $this->get_shipping_options();
			}
		} else {
			if ( WC()->cart ) {
				$cart                     = WC()->cart;
				$data['total_price']      = wc_format_decimal( $cart->get_total( 'float' ), 2 );
				$data['display_items']    = $this->get_display_items_for_cart( $cart );
				$data['shipping_options'] = $this->get_shipping_options();
			}
		}

		return $data;
	}

	/**
	 * Format a single display item for Google Pay
	 * Required by DisplayItemsTrait
	 *
	 * @param float $price
	 * @param string $label
	 * @param string $type
	 *
	 * @return array
	 */
	protected function get_display_item( $price, $label, $type ) {
		switch ( $type ) {
			case 'tax':
				$type = 'TAX';
				break;
			default:
				$type = 'LINE_ITEM';
				break;
		}

		return [
			'label' => $label,
			'type'  => $type,
			'price' => wc_format_decimal( $price, 2 )
		];
	}

	/**
	 * Format display item for a product
	 * Required by DisplayItemsTrait
	 *
	 * @param \WC_Product $product
	 *
	 * @return array
	 */
	protected function get_display_item_for_product( $product ) {
		return [
			'label' => esc_attr( $product->get_name() ),
			'type'  => 'SUBTOTAL',
			'price' => wc_format_decimal( $product->get_price(), 2 )
		];
	}

	/**
	 * Format a single shipping option for Google Pay
	 * Required by DisplayItemsTrait
	 *
	 * @param float $price The price/amount for this shipping method
	 * @param \WC_Shipping_Rate $rate The shipping rate object
	 * @param int $index The package index
	 * @param array $package The shipping package
	 * @param bool $incl_tax Whether prices include tax
	 *
	 * @return array
	 */
	public function get_shipping_option( $price, $rate, $index, $package, $incl_tax ) {
		$description = $rate->get_description();
		if ( ! $description && $rate->get_delivery_time() ) {
			$description = $rate->get_delivery_time();
		}

		return [
			'id'          => $this->get_shipping_method_id( $rate->id, $index ),
			'label'       => $this->get_formatted_shipping_label( $price, $rate, $incl_tax ),
			'description' => $description
		];
	}

	/**
	 * Get formatted shipping label with price and tax information
	 *
	 * @param float $price
	 * @param \WC_Shipping_Rate $rate
	 * @param bool $incl_tax
	 *
	 * @return string
	 */
	protected function get_formatted_shipping_label( $price, $rate, $incl_tax ) {
		$label = sprintf( '%s: %s %s', esc_attr( $rate->get_label() ), wc_format_decimal( $price, 2 ), get_woocommerce_currency() );
		if ( $incl_tax ) {
			if ( $rate->get_shipping_tax() > 0 && ! wc_prices_include_tax() ) {
				$label .= ' ' . WC()->countries->inc_tax_or_vat();
			}
		} else {
			if ( $rate->get_shipping_tax() > 0 && wc_prices_include_tax() ) {
				$label .= ' ' . WC()->countries->ex_tax_or_vat();
			}
		}

		return $label;
	}

	public function get_payment_button_locale() {
		$locale = get_locale();
		if ( $locale ) {
			$locale = str_replace( '_', '-', substr( $locale, 0, 2 ) );
			if ( in_array( $locale, $this->supported_locales, true ) ) {
				return $locale;
			}
		}

		return 'en';
	}

	public function get_supported_currencies() {
		return apply_filters( 'wc_ppcp_googlepay_supported_currencies', $this->supported_currencies, $this );
	}

	public function get_product_form_fields( $fields ) {
		return array_merge( $fields, [
			'googlepay_enabled' => [
				'title'   => __( 'Google Pay Enabled', 'pymntpl-paypal-woocommerce' ),
				'type'    => 'checkbox',
				'default' => in_array( 'product', (array) $this->get_option( 'sections', [] ) ) ? 'yes' : 'no'
			],
		] );
	}

	public function is_product_section_enabled( $product ) {
		$setting = new ProductSettings( $product );

		return \wc_string_to_bool( $setting->get_option( 'googlepay_enabled', 'no' ) );
	}

	/**
	 * @throws \Exception
	 */
	public function validate_paypal_order( $paypal_order, $order ) {
		$this->validate_3ds_order( $paypal_order, $order );
	}


}