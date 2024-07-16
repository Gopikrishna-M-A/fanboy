'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from '@/contexts/cart';
import { useAuth } from '@/hooks/useAuth'
import PaymentSuccessCard from './PaymentSuccessCard'; 
import LottieLoader from "@/components/LottieLoader";

const RazorpayPage = ({ setCurrent }) => {
  const razorpayKEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
  const { cart, cartTotalPrice, emptyCart } = useCart();
  const { user } = useAuth()
  const [paymentSuccess, setPaymentSuccess] = useState(false);


  function transformArray(originalArray) {
    return originalArray.map(item => {
      return {
        jersey: item.jersey._id, 
        quantity: item.quantity,
        price: item.jersey.price,
        size: item.size
      };
    });
  }

  useEffect(() => {
    if(cartTotalPrice > 0){
      makePayment()
    }
  }, []);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    const amount = cartTotalPrice - (cart?.discountAmount || 0);
    const response = await axios.post(`/api/orders`, {
      amount,
    });
    const data = response.data;
    var options = {
      key: razorpayKEY, // Enter the Key ID generated from the Dashboard
      name: "Fanboy Jerseys",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thank you for shopping with us",
      // image: "https://manuarora.in/logo.png",
      handler: function (response) {
        const jerseys = transformArray(cart.items);
        try {
          const res  = axios.post(`/api/orders/verify`,{
            total: amount*100,
            subTotal:cartTotalPrice,
            discountAmount:cart?.discountAmount,
            coupon:cart?.appliedCoupon,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            jerseys,
            shippingAddress: user.address,
          }).then(res => {
            if(res.status === 200){
              setPaymentSuccess(true);
              emptyCart()

              axios.post('/api/mail', {
                jerseys:cart.items,
                orderId:res.data.order.orderNumber,
                shippingAddress:res.data.order.shippingAddress,
                amount:res.data.order.total
              }).then((res)=>{
                console.log("mail",res.data);
              }).catch((err)=>console.log("mail",err))
             
            }
          })

        }catch(err){
          console.log("error",err);
        }
        
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.address.phone,
      },
      modal: {
        ondismiss: function() {
          setCurrent(0)
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
    {paymentSuccess ? (
      <PaymentSuccessCard customerName={user.name} />
    ) : (
      <div className="flex justify-center items-center h-screen">
      <LottieLoader />
    </div>
    )}
  </div>
  );
};

export default RazorpayPage;