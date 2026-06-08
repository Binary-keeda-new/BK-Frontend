import express from "express";
import cors from "cors";

import userRoutes from "./modules/user/user.routes.js";
import jobsRoutes from "./modules/jobs/jobs.routes.js";
import adminJobsRoutes from "./modules/jobs/admin.jobs.routes.js";
import interviewRoutes from "./modules/interviews/interviews.routes.js";
import adminQuestionBankRoutes from "./modules/questionBank/admin.questionBank.routes.js";
import adminQuizRoutes from "./modules/quiz/admin.quiz.routes.js";
import adminBlogsRoutes from "./modules/blogs/admin.blogs.routes.js";
import userBlogsRoutes from "./modules/blogs/user.blogs.routes.js";

import atsRoutes from "./modules/ats/ats.routes.js";


import adminQuizQuestionRoutes from "./modules/quiz-question/admin.quizQuestion.routes.js";
import quizAttemptRoutes from "./modules/quiz-attempt/quiz.attempt.routes.js";
import userQuizRoutes from "./modules/quiz/user.quiz.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://www.binarykeeda.com",
  "https://emple.in",
  "https://www.emple.in",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/interviews", interviewRoutes);
app.use("/api/v1/blogs", userBlogsRoutes);
app.use("/api/v1/jobs", jobsRoutes);
app.use("/api/v1/ats", atsRoutes);


app.use("/api/v1", quizAttemptRoutes);
app.use("/api/v1/quizzes", userQuizRoutes);

// admin routes
app.use("/api/v1/admin/question-banks", adminQuestionBankRoutes);
app.use("/api/v1/admin/quizzes", adminQuizRoutes);
app.use("/api/v1/admin/quiz-questions", adminQuizQuestionRoutes);
app.use("/api/v1/admin/blogs", adminBlogsRoutes);
app.use("/api/v1/admin/jobs", adminJobsRoutes);

// 404 handler comes last
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// error handler last
app.use((err, req, res, next) => {
  console.error(err);

  return res.status(err.statusCode || 400).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

export default app;