import Interview from "./interviews.model.js";

// ── Read ───────────────────────────────────────────────────────────────────

export async function getAllInterviews() {
  const interviews = await Interview.find().sort({ createdAt: -1 }).lean();
  return interviews.map(({ _id, ...rest }) => ({ id: _id, ...rest }));
}

export async function getInterviewById(id) {
  const interview = await Interview.findById(id).lean();
  if (!interview) return null;
  const { _id, ...rest } = interview;
  return { id: _id, ...rest };
}

// ── Write ──────────────────────────────────────────────────────────────────

export async function createInterview(data) {
  const interview = new Interview(data);
  const saved = await interview.save();
  const { _id, ...rest } = saved.toObject();
  return { id: _id, ...rest };
}