import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jersey",
      required: true,
    },
  ],
});

export default mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema)
