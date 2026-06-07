import { validationResult } from "express-validator";
import * as jobsService from "./jobs.service.js";

// ── Utility ────────────────────────────────────────────────────────────────

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ success: false, errors: errors.array() });
    return true;
  }
  return false;
}

// ── User controllers ───────────────────────────────────────────────────────

export async function listJobs(req, res) {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;

    const jobs = await jobsService.getAllJobs(filter);
    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    console.error("[Jobs] listJobs error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
}

export async function getJob(req, res) {
  try {
    const job = await jobsService.getJobById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, data: job });
  } catch (err) {
    console.error("[Jobs] getJob error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch job" });
  }
}

// ── Admin controllers ──────────────────────────────────────────────────────

export async function createJob(req, res) {
  if (handleValidation(req, res)) return;
  try {
    const job = await jobsService.createJob(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    console.error("[Jobs] createJob error:", err);
    res.status(500).json({ success: false, message: "Failed to create job" });
  }
}

export async function updateJob(req, res) {
  if (handleValidation(req, res)) return;
  try {
    const job = await jobsService.updateJob(req.params.id, req.body);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, data: job });
  } catch (err) {
    console.error("[Jobs] updateJob error:", err);
    res.status(500).json({ success: false, message: "Failed to update job" });
  }
}

export async function deleteJob(req, res) {
  if (handleValidation(req, res)) return;
  try {
    const job = await jobsService.deleteJob(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, message: "Job deleted" });
  } catch (err) {
    console.error("[Jobs] deleteJob error:", err);
    res.status(500).json({ success: false, message: "Failed to delete job" });
  }
}