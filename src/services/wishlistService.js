import dbConnect from './db';
import Team from './models/Team';
import Wishlist from './models/Wishlist';

export async function getWishlist(userId) {
  await dbConnect();

  const wishlist = await Wishlist.findOne({ user: userId }).populate({
    path: 'jerseys',
    populate: {
      path: 'team',
      model: Team,
    },
  });

  return wishlist ? JSON.parse(JSON.stringify(wishlist)) : null;
}

export async function addToWishlist(userId, jerseyId) {
  await dbConnect();

  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = new Wishlist({ user: userId, jerseys: [] });
  }

  if (!wishlist.jerseys.includes(jerseyId)) {
    wishlist.jerseys.push(jerseyId);
    await wishlist.save();
    wishlist = await Wishlist.findOne({ user: userId }).populate('jerseys');
  }

  return wishlist ? JSON.parse(JSON.stringify(wishlist)) : null;
}

export async function removeFromWishlist(userId, jerseyId) {
  await dbConnect();

  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    return null;
  }

  wishlist.jerseys = wishlist.jerseys.filter((id) => id.toString() !== jerseyId);
  await wishlist.save();
  wishlist = await Wishlist.findOne({ user: userId }).populate('jerseys');

  return wishlist ? JSON.parse(JSON.stringify(wishlist)) : null;
}

export async function clearWishlist(userId) {
  await dbConnect();

  const result = await Wishlist.findOneAndDelete({ user: userId });

  return result ? JSON.parse(JSON.stringify(result)) : null;
}
