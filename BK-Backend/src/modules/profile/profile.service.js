import Profile from './profile.model.js';

export async function getProfileByUserId(userId) {
  return Profile.findOne({ userId }).lean();
}

export async function upsertProfile(userId, data) {
  const { _id, userId: _uid, ...payload } = data;
  return Profile.findOneAndUpdate(
    { userId },
    { $set: { ...payload, userId } },
    { new: true, upsert: true, runValidators: true }
  );
}
