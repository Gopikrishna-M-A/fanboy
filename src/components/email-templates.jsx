import React from 'react';

export const UserConfirmationEmail = ({ name, orderId, items, total, shippingAddress }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <h1 style={{ color: '#4a4a4a' }}>Thank you for your order, {name}!</h1>
    <p>Your order (#{orderId}) has been confirmed and is being processed.</p>
    <h2>Order Summary:</h2>
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item.quantity}x {item.jersey.name} - Size: {item.size} - ₹{item.jersey.price.toFixed(2)}
        </li>
      ))}
    </ul>
    <p><strong>Total: ₹{total.toFixed(2)}</strong></p>
    <h2>Shipping Address:</h2>
    <p>
      {shippingAddress.street}<br />
      {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipcode}<br />
      {'India'}
    </p>
    <p>Thank you for shopping with Fanboy Jerseys!</p>
  </div>
);

export const OwnerNotificationEmail = ({ orderId, items, total, customerName, shippingAddress }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <h1 style={{ color: '#4a4a4a' }}>New Order Received!</h1>
    <p>A new order (#{orderId}) has been placed by {customerName}.</p>
    <h2>Order Details:</h2>
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item.quantity}x {item.jersey.name} - Size: {item.size} - ₹{item.jersey.price.toFixed(2)}
        </li>
      ))}
    </ul>
    <p><strong>Total: ₹{total.toFixed(2)}</strong></p>
    <h2>Shipping Address:</h2>
    <p>
      {shippingAddress.street}<br />
      {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipcode}<br />
      {'India'}
    </p>
    <p>Phone: {shippingAddress.phone}</p>
    <p>Please process this order as soon as possible.</p>
  </div>
);