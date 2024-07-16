import mongoose from "mongoose"
import Coupon from "./Coupon"

const cartSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      jersey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jersey",
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  appliedCoupon:{
    type: mongoose.Schema.Types.ObjectId,
    ref: Coupon,
  },
  discountAmount:Number
})

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema)