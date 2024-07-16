import dbConnect from "./db"
import Coupon from "./models/Coupon"
import User from "./models/User"
import Cart from "./models/Cart"
import Jersey from "./models/Jersey"

export async function createCoupon(couponData) {
  await dbConnect()

  const newCoupon = new Coupon(couponData)
  await newCoupon.save()

  return JSON.parse(JSON.stringify(newCoupon))
}

export async function getCouponByCode(code) {
  await dbConnect()

  const coupon = await Coupon.findOne({ code })
  return coupon ? JSON.parse(JSON.stringify(coupon)) : null
}

export async function applyCouponToCart(userId, couponCode) {
  await dbConnect()

  const user = await User.findById(userId)
  if (!user) {
    throw new Error("User not found")
  }

  const coupon = await Coupon.findOne({ code: couponCode })
  if (!coupon) {
    throw new Error("Coupon not found")
  }

  if (!coupon.isActive || coupon.endDate < new Date()) {
    throw new Error("Coupon is not active or has expired")
  }

  if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
    throw new Error("Coupon usage limit reached")
  }

  if (coupon.eligibleEmails && !coupon.eligibleEmails.includes(user.email)) {
    throw new Error("User is not eligible for this coupon")
  }

  // Check if the user has already used this coupon or has pending usage
  if (coupon.usedBy.includes(userId) || coupon.pendingUsage.includes(userId)) {
    throw new Error("You have already used this coupon")
  }

  const cart = await Cart.findOne({ customer: userId }).populate('items.jersey')
  if (!cart) {
    throw new Error("Cart not found")
  }

  let totalAmount = await calculateCartTotal(cart)

  if (totalAmount < coupon.minPurchase) {
    throw new Error(
      "Purchase amount does not meet the minimum required for this coupon"
    )
  }

  let discountAmount =
    coupon.discountType === "percentage"
      ? totalAmount * (coupon.discountValue / 100)
      : coupon.discountValue

  if (coupon.maxDiscount) {
    discountAmount = Math.min(discountAmount, coupon.maxDiscount)
  }

  const finalAmount = totalAmount - discountAmount

  // Add user to pendingUsage array
  coupon.pendingUsage.push(userId)
  await coupon.save()

  // Update the cart with the applied coupon
  cart.appliedCoupon = coupon._id
  cart.discountAmount = discountAmount
  await cart.save()
  await cart.populate('appliedCoupon')

  return {
    cart: JSON.parse(JSON.stringify(cart)),
    totalAmount,
    discountAmount,
    finalAmount,
  }
}

export async function removeCouponFromCart(userId) {
  await dbConnect()

  const cart = await Cart.findOne({ customer: userId }).populate("items.jersey")
  if (!cart) {
    throw new Error("Cart not found")
  }

  if (cart.appliedCoupon) {
    const coupon = await Coupon.findById(cart.appliedCoupon)
    if (coupon) {
      await removePendingCouponUsage(userId, coupon.code)
    }
  } 

  cart.appliedCoupon = undefined
  cart.discountAmount = 0
  await cart.save()

  return cart
}

async function calculateCartTotal(cart) {
  let total = 0
  for (const item of cart.items) {
    const jersey = await Jersey.findById(item.jersey)
    if (jersey) {
      total += jersey.price * item.quantity
    }
  }
  return total
}

export async function getCouponsByUser(userEmail) {
  await dbConnect()

  const coupons = await Coupon.find({
    $or: [
      { eligibleEmails: { $in: [userEmail] } },
      { eligibleEmails: { $exists: false } },
    ],
    isActive: true,
    endDate: { $gt: new Date() },
  })

  return JSON.parse(JSON.stringify(coupons))
}

export async function updateCoupon(couponId, updateData) {
  await dbConnect()

  const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updateData, {
    new: true,
  })
  return updatedCoupon ? JSON.parse(JSON.stringify(updatedCoupon)) : null
}

export async function deleteCoupon(couponId) {
  await dbConnect()

  const result = await Coupon.findByIdAndDelete(couponId)
  return result ? JSON.parse(JSON.stringify(result)) : null
}



export async function finalizeCouponUsage(userId, couponCode) {
  await dbConnect()

  const coupon = await Coupon.findOne({ code: couponCode })
  if (!coupon) {
    throw new Error("Coupon not found")
  }

  if (!coupon.pendingUsage.includes(userId)) {
    throw new Error("No pending usage found for this user and coupon")
  }

  // Remove user from pendingUsage and add to usedBy
  coupon.pendingUsage = coupon.pendingUsage.filter(id => id.toString() !== userId.toString())
  coupon.usedBy.push(userId)
  coupon.usageCount += 1

  await coupon.save()

  return {
    couponCode,
    usageCount: coupon.usageCount,
    remainingUses: coupon.usageLimit ? coupon.usageLimit - coupon.usageCount : 'unlimited'
  }
}

export async function removePendingCouponUsage(userId, couponCode) {
  await dbConnect()

  const coupon = await Coupon.findOne({ code: couponCode })
  if (!coupon) {
    throw new Error("Coupon not found")
  }

  // Remove user from pendingUsage
  coupon.pendingUsage = coupon.pendingUsage.filter(id => id.toString() !== userId.toString())

  await coupon.save()

  return {
    couponCode,
    message: "User removed from pending usage list"
  }
}