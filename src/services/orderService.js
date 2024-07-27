import crypto from 'crypto';
import razorpay from 'razorpay';
import Order from './models/Order';
import Jersey from './models/Jersey';
import { finalizeCouponUsage } from './couponServices';

function checkAmountWithTax(amountInPaise, totalInPaise) {
  // Convert paise to rupees
  let amountInRupees = amountInPaise / 100;
  let totalInRupees = totalInPaise / 100;

  // Calculate the pre-tax amount by removing the 2% service tax
  let preTaxAmount = amountInRupees / 1.02;

  // Compare the pre-tax amount with the total
  return preTaxAmount.toFixed(2) === totalInRupees.toFixed(2);
}

function generateOrderNumber() {
  // Generate the random color string using crypto for enhanced randomness
  const randomBytes = crypto.randomBytes(3);
  const orderNumber = `FB-${randomBytes.toString('hex')}`;

  return orderNumber;
}

const razorpayClient = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function getAllOrders() {
  try {
    const orders = await Order.find()
      .populate('customer')
      .populate('jerseys.jersey')
      .sort({ orderDate: -1 });
    return orders;
  } catch (error) {
    console.error('Error getting all orders:', error);
    throw new Error('An error occurred');
  }
}

export async function verifyOrder({
  razorpay_payment_id,
  razorpay_order_id,
  discountAmount,
  coupon,
  subTotal,
  razorpay_signature,
  total,
  customer,
  jerseys,
  shippingAddress
}) {
  try {
    // Fetch payment details from Razorpay
    const payment = await razorpayClient.payments.fetch(razorpay_payment_id);
    const { status, amount, currency, order_id, method } = payment;
    console.log("new status",status, amount, currency, order_id, method);

    // Verify payment details
    const isValidPayment = (
      status === 'captured' &&
      // checkAmountWithTax(amount,total) &&
      amount===total &&
      currency === 'INR' &&
      order_id === razorpay_order_id
    );


    if (isValidPayment) {
      const totalPrice = total / 100;
      const orderNumber = generateOrderNumber();

      const newOrder = new Order({
        customer,
        jerseys,
        discountAmount,
        coupon,
        subTotal,
        total: totalPrice,
        shippingAddress,
        paymentStatus: status === 'captured' ? 'Paid' : 'Pending',
        paymentId: razorpay_payment_id,
        OrderId: order_id,
        signature: razorpay_signature,
        method,
        orderNumber,
        orderStatus: [{ status: "Processing", timestamp: Date.now() }]
      });

      console.log("new order",newOrder);

      const savedOrder = await newOrder.save();

       // Update jersey quantities
       for (const item of jerseys) {
        const jersey = await Jersey.findById(item.jersey);
        if (!jersey) {
          throw new Error(`Jersey with id ${item.jersey} not found`);
        }
        jersey.stock -= item.quantity;
        if (jersey.quantity < 0) {
          throw new Error(`Insufficient quantity for jersey ${jersey.name}`);
        }
        await jersey.save();
      }

       // Finalize coupon usage if a coupon was used
       if (coupon) {
        try {
          await finalizeCouponUsage(customer, coupon);
        } catch (couponError) {
          console.error('Error finalizing coupon usage:', couponError);
          // Note: We're not throwing an error here to avoid rolling back the order
          // You might want to log this for manual review
        }
      }
      return savedOrder;
    } else {
      // Invalid payment
      throw new Error('Invalid payment');
    }
  } catch (error) {
    console.error('Error verifying order:', error);
    throw new Error('Internal server error');
  }
}


export async function statusUpdate(orderId, newStatus) {
  const orderDescMapping = {
    "Processing": "Your order is confirmed and in processing. Thank you for your patience.",
    "Packed": "All items are packed and ready for dispatch. Your order is prepared with care.",
    "Shipped": "Your package is on its way! It has been dispatched from our store.",
    "Delivered": "Package successfully delivered to your address. Enjoy your purchase!",
    "Completed": "Congratulations! Your order is successfully completed. Thank you for choosing us!",
    "Cancelled": "Regrettably, your order has been cancelled. Contact support for assistance.",
    "Refunded": "Good news! Your order has been refunded. Expect the amount in your account soon.",
  };

  try {
    // Find the order by ID
    const order = await Order.findById(orderId).populate('jerseys.jersey').populate('customer');

    // Check if the order exists
    if (!order) {
      throw new Error('Order not found');
    }

    // Add the new status to the orderStatus array
    order.orderStatus.push({
      status: newStatus,
      timestamp: new Date(),
      desc: orderDescMapping[newStatus]
    });

    // Save the updated order
    await order.save();

    return order;
  } catch (error) {
    console.error('Error updating status:', error);
    throw new Error('Internal server error');
  }
}

export async function statusRemove(orderId) {
  try {
    // Find the order by ID
    const order = await Order.findById(orderId).populate('jerseys.jersey').populate('customer');

    // Check if the order exists
    if (!order) {
      throw new Error('Order not found');
    }

    // Remove the last status from the orderStatus array
    order.orderStatus.pop();

    // Save the updated order
    await order.save();

    return order;
  } catch (error) {
    console.error('Error removing status:', error);
    throw new Error('Internal server error');
  }
}

export async function createOrder({ amount }) {
  console.log("amount",amount);

  try {
    const order = await razorpayClient.orders.create({
      amount: amount * 100, 
      currency: 'INR',
    });
    console.log("order serv",order);
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Bad request');
  }
}

export async function getOrderDetails(orderId) {
  try {
    const order = await Order.findById(orderId).populate('jerseys.jersey').populate('customer');

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  } catch (error) {
    console.error('Error getting order details:', error);
    throw new Error('An error occurred');
  }
}

export async function getOrderHistory(userId){
  try {
    const orderHistory = await Order.find({ customer: userId })
      .populate('jerseys.jersey')
      .sort({ orderDate: -1 });
    return orderHistory;
  } catch (error) {
    console.error('Error getting order history:', error);
    throw error; 
  }
}