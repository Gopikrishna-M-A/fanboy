import React from 'react';
import { useCart } from "@/contexts/cart";

const PriceDetails = () => {
  const { cart, cartTotalPrice } = useCart();

  const subtotal = cartTotalPrice;
  const discount = cart?.discountAmount || 0;
  const total = subtotal - discount;

  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Discount:</span>
          <span>-₹{discount.toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between font-bold">
        <span>Total:</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
      {cart?.appliedCoupon && (
        <div className="text-sm text-gray-600 mt-2">
          Applied Coupon: {cart.appliedCoupon.code}
        </div>
      )}
    </div>
  );
};

export default PriceDetails;