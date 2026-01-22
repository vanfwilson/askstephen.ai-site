<?php

namespace PaymentPlugins\WooCommerce\PPCP\Assets;

use PaymentPlugins\WooCommerce\PPCP\Utilities\NumberUtil;

/**
 * Transforms WooCommerce entities into PayPal-compatible data structures.
 *
 * This class is responsible for converting WooCommerce objects (Cart, Product, Order)
 * into normalized data arrays that the PayPal JavaScript integration expects.
 */
class PayPalDataTransformer {

	/**
	 * Transform WooCommerce cart into PayPal data structure
	 *
	 * @param \WC_Cart $cart
	 *
	 * @return array
	 */
	public function transform_cart( $cart ) {
		return [
			'total'                   => NumberUtil::round( $cart->get_total( 'float' ), 2 ),
			'needsShipping'           => $cart->needs_shipping(),
			'isEmpty'                 => $cart->is_empty(),
			'currency'                => get_woocommerce_currency(),
			'availablePaymentMethods' => array_keys( WC()->payment_gateways()->get_available_payment_gateways() )
		];
	}

	/**
	 * Transform WooCommerce product into PayPal data structure
	 *
	 * @param \WC_Product $product
	 *
	 * @return array
	 */
	public function transform_product( $product ) {
		return [
			'id'            => $product->get_id(),
			'needsShipping' => $product->needs_shipping(),
			'total'         => NumberUtil::round( $product->get_price() ),
			'price'         => NumberUtil::round( wc_get_price_to_display( $product ) ),
			'currency'      => get_woocommerce_currency()
		];
	}

	/**
	 * Transform WooCommerce order into PayPal data structure
	 *
	 * @param \WC_Order $order
	 *
	 * @return array
	 */
	public function transform_order( $order ) {
		return [
			'order_id'  => $order->get_id(),
			'order_key' => $order->get_order_key(),
			'currency'  => $order->get_currency()
		];
	}

}