import mongoose from "mongoose"

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
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
})

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema)