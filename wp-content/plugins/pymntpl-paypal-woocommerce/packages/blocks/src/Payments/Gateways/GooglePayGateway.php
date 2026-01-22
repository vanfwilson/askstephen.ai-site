<?php

namespace PaymentPlugins\PPCP\Blocks\Payments\Gateways;

use PaymentPlugins\PPCP\Blocks\Utils\ActionUtils;

class GooglePayGateway extends AbstractGateway {

	protected $name = 'ppcp_googlepay';

	public function get_payment_method_script_handles() {
		$this->assets_api->register_script( 'wc-ppcp-blocks-googlepay', 'build/googlepay.js', [
			'wc-ppcp-googlepay-external'
		] );

		return [ 'wc-ppcp-blocks-googlepay' ];
	}

	public function get_payment_method_data() {
		$base_url = \plugins_url( 'assets/images/payment-methods/', WC_PLUGIN_FILE );
		$gateway  = $this->get_payment_method();
		$token    = $gateway->get_payment_method_token_instance();
		$format   = $token->get_payment_method_format( $gateway->get_option( 'payment_format', 'type_ending_in' ) );
		$data     = [
			'sections'            => $this->get_setting( 'sections', [] ),
			'button'              => [
				'buttonColor'      => $this->get_setting( 'button_color', 'default' ),
				'buttonType'       => $this->get_setting( 'button_type', 'buy' ),
				'buttonBorderType' => $this->get_setting( 'button_border', 'rectangle' ),
				'buttonSizeMode'   => $this->get_setting( 'button_size', 'fill' ),
				'buttonRadius'     => absint( $this->get_setting( 'button_radius', 4 ) ),
				'buttonLocale'     => $gateway->get_payment_button_locale(),
				'buttonHeight'     => $this->get_setting( 'button_height', 40 ) . 'px',
			],
			'editorIcons'         => array(
				'long'  => $this->assets_api->assets_url( 'assets/img/gpay_button_buy_black.svg' ),
				'short' => $this->assets_api->assets_url( 'assets/img/gpay_button_black.svg' )
			),
			'cardIcons'           => [
				'amex'       => $base_url . 'amex.svg',
				'diners'     => $base_url . 'diners.svg',
				'discover'   => $base_url . 'discover.svg',
				'jcb'        => $base_url . 'jcb.svg',
				'maestro'    => $base_url . 'maestro.svg',
				'mastercard' => $base_url . 'mastercard.svg',
				'visa'       => $base_url . 'visa.svg'
			],
			'paymentFormat'       => $format,
			'supportedCurrencies' => $gateway->get_supported_currencies(),
		];

		return ActionUtils::apply_payment_data_filter(
			array_merge( parent::get_payment_method_data(), $data ),
			$this
		);
	}

	public function get_payment_method_icons() {
		return [
			'id'  => 'GooglePay',
			'src' => $this->assets_api->assets_url(
				'../../assets/img/googlepay/' . $this->get_setting( 'icon', 'googlepay_round_outline' ) . '.svg'
			),
			'alt' => 'Google Pay'
		];
	}

	public function add_schema_payment_data( $data, $gateway ) {
		$cart = WC()->cart;
		/**
		 * @var \PaymentPlugins\WooCommerce\PPCP\Payments\Gateways\GooglePayGateway $gateway ;
		 */
		$data['googlepay'] = [
			'total_price'      => wc_format_decimal( $cart->get_total( 'float' ), 2 ),
			'display_items'    => $gateway->get_display_items_for_cart( $cart ),
			'shipping_options' => $gateway->get_shipping_options(),
			'shipping_method'  => $gateway->get_selected_shipping_method(),
			'currency_code'    => get_woocommerce_currency(),
			'country_code'     => WC()->countries->get_base_country(),
			'i18n'             => [
				'total_price_label' => __( 'Total', 'pymntpl-paypal-woocommerce' ),
			]
		];

		return $data;
	}

}