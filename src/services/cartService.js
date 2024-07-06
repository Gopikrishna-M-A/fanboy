import dbConnect from './db';
import Cart from './models/Cart';
import Jersey from './models/Jersey'; // Assuming you have a Jersey model
import Team from './models/Team';


export async function getCartByUserId(userId) {
  await dbConnect();

  const cart = await Cart.findOne({ customer: userId }).populate({
    path: 'items.jersey',
    model: Jersey,
    populate: {
      path: 'team',
      model: Team
    }
  });
  return cart ? JSON.parse(JSON.stringify(cart)) : null;
}

export async function upsertCartItem(userId, jerseyId, quantity) {
  await dbConnect();

  let cart = await Cart.findOne({ customer: userId });

  if (!cart) {
    cart = new Cart({ customer: userId, items: [] });
  }

  const jersey = await Jersey.findById(jerseyId);

  if (!jersey) {
    throw new Error('Jersey not found');
  }

  const existingItemIndex = cart.items.findIndex(
    item => item.jersey.toString() === jerseyId
  );

  if (existingItemIndex !== -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({ jersey: jerseyId, quantity });
  }

  await cart.save();
  return getCartByUserId(userId);
}

export async function removeFromCart(userId, jerseyId) {
  await dbConnect();

  let cart = await Cart.findOne({ customer: userId });

  if (!cart) {
    return null;
  }

  cart.items = cart.items.filter(item => item.jersey.toString() !== jerseyId);
  await cart.save();
  return getCartByUserId(userId);
}

export async function clearCart(userId) {
  await dbConnect();

  const result = await Cart.findOneAndDelete({ customer: userId });

  return result ? JSON.parse(JSON.stringify(result)) : null;
}