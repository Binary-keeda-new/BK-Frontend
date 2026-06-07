import Job from "./jobs.model.js";
// ── Helpers ────────────────────────────────────────────────────────────────

function getResultReleasedAt(stages = []) {
  const resultStage = stages.find(
    (s) => s.name.toLowerCase() === "result" && s.status === "released"
  );
  return resultStage ? resultStage.releasedAt : null;
}

// ── Read ───────────────────────────────────────────────────────────────────

export async function getAllJobs(filter = {}) {
  const query = {};
  if (filter.type) query.type = filter.type;

  return Job.find(query).sort({ lastUpdated: -1 }).lean();
}

export async function getJobById(id) {
  return Job.findById(id).lean();
}

// ── Write ──────────────────────────────────────────────────────────────────

export async function createJob(data) {
  if (data.type === "government" && Array.isArray(data.stages)) {
    data.stages = data.stages.map((s) => ({
      ...s,
      releasedAt:
        s.status === "released" ? s.releasedAt || new Date() : null,
    }));
  }

  const job = new Job(data);
  return job.save();
}

export async function updateJob(id, data) {
  const existing = await Job.findById(id);
  if (!existing) return null;

  if (data.type === "government" || existing.type === "government") {
    if (Array.isArray(data.stages)) {
      const prevStages = existing.stages || [];
      data.stages = data.stages.map((incoming, idx) => {
        const prev = prevStages[idx] || {};
        const wasReleased = prev.status === "released";
        const nowReleased = incoming.status === "released";

        return {
          ...incoming,
          releasedAt: nowReleased
            ? wasReleased
              ? prev.releasedAt
              : incoming.releasedAt || new Date()
            : null,
        };
      });
    }
  }

  data.lastUpdated = new Date();

  return Job.findByIdAndUpdate(id, { $set: data }, { returnDocument: "after" , runValidators: true });
}

export async function deleteJob(id) {
  return Job.findByIdAndDelete(id);
}

// ── Cron cleanup ───────────────────────────────────────────────────────────

export async function runCleanup() {
  const now = new Date();

  const privateThreshold = new Date(now - 14 * 24 * 60 * 60 * 1000);
  const { deletedCount: privateDeleted } = await Job.deleteMany({
    type: "private",
    createdAt: { $lt: privateThreshold },
  });

  const govThreshold = new Date(now - 10 * 24 * 60 * 60 * 1000);
  const { deletedCount: govDeleted } = await Job.deleteMany({
    type: "government",
    stages: {
      $elemMatch: {
        name: /^result$/i,
        status: "released",
        releasedAt: { $lt: govThreshold },
      },
    },
  });

  return { privateDeleted, govDeleted };
}