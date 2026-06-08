import Profile from './profile.model.js';

export async function getProfile(req, res) {
  try {
    const profile = await Profile.findOne({ userId: req.user.sub }).lean();
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
    res.json({ success: true, data: profile });
  } catch (err) {
    console.error('[Profile] getProfile error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
}

export async function createProfile(req, res) {
  try {
    const exists = await Profile.findOne({ userId: req.user.sub });
    if (exists) return res.status(409).json({ success: false, message: 'Profile already exists. Use PUT to update.' });
    const profile = await new Profile({ ...req.body, userId: req.user.sub }).save();
    res.status(201).json({ success: true, data: profile });
  } catch (err) {
    console.error('[Profile] createProfile error:', err);
    res.status(500).json({ success: false, message: 'Failed to create profile' });
  }
}

export async function upsertProfile(req, res) {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.sub },
      { $set: { ...req.body, userId: req.user.sub } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
    res.json({ success: true, data: profile });
  } catch (err) {
    console.error('[Profile] upsertProfile error:', err);
    res.status(500).json({ success: false, message: 'Failed to save profile' });
  }
}
