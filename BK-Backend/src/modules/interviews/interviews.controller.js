import { validationResult } from "express-validator";
import * as interviewsService from "./interviews.service.js";

// ── Utility ────────────────────────────────────────────────────────────────

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ success: false, errors: errors.array() });
    return true;
  }
  return false;
}

// ── Controllers ────────────────────────────────────────────────────────────

export async function listInterviews(req, res) {
  try {
    const interviews = await interviewsService.getAllInterviews();
    res.json({ success: true, count: interviews.length, data: interviews });
  } catch (err) {
    console.error("[Interviews] listInterviews error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch interviews" });
  }
}

export async function getInterview(req, res) {
  try {
    const interview = await interviewsService.getInterviewById(req.params.id);
    if (!interview) return res.status(404).json({ success: false, message: "Interview not found" });
    res.json({ success: true, data: interview });
  } catch (err) {
    console.error("[Interviews] getInterview error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch interview" });
  }
}

export async function createInterview(req, res) {
  if (handleValidation(req, res)) return;
  try {
    const interview = await interviewsService.createInterview(req.body);
    res.status(201).json({ success: true, data: interview });
  } catch (err) {
    console.error("[Interviews] createInterview error:", err);
    res.status(500).json({ success: false, message: "Failed to create interview" });
  }
}