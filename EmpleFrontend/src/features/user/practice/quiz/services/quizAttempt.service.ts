import { getSessionToken } from "@descope/nextjs-sdk/client";
import { parseJsonResponse } from "@/shared/utils/api";
import type {
  QuizAttemptResponse,
  QuizAttemptResultResponse,
  SaveAnswerPayload,
  SubmitAttemptPayload
} from "../types/quizAttempt.types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function buildApiUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}

async function getAuthHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (typeof window !== "undefined") {
    const token = getSessionToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const authHeaders = await getAuthHeaders();

  const res = await fetch(buildApiUrl(path), {
    ...init,
    headers: {
      ...authHeaders,
      ...(init?.headers || {}),
    },
    credentials: "include",
  });

  return parseJsonResponse<T>(res);
}

export async function startQuizAttempt(
  quizId: string
): Promise<QuizAttemptResponse> {
  return request<QuizAttemptResponse>(`/api/v1/quizzes/${quizId}/attempts`, {
    method: "POST",
  });
}

export async function getQuizAttempt(
  attemptId: string
): Promise<QuizAttemptResponse> {
  return request<QuizAttemptResponse>(`/api/v1/quiz-attempts/${attemptId}`, {
    method: "GET",
  });
}

export async function saveQuizAnswer(
  attemptId: string,
  payload: SaveAnswerPayload
): Promise<QuizAttemptResponse> {
  return request<QuizAttemptResponse>(
    `/api/v1/quiz-attempts/${attemptId}/answer`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    }
  );
}

export async function submitQuizAttempt(
  attemptId: string,
  payload: SubmitAttemptPayload
): Promise<QuizAttemptResultResponse> {
  return request<QuizAttemptResultResponse>(
    `/api/v1/quiz-attempts/${attemptId}/submit`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}

export async function getQuizAttemptResult(
  attemptId: string
): Promise<QuizAttemptResultResponse> {
  return request<QuizAttemptResultResponse>(
    `/api/v1/quiz-attempts/${attemptId}/result`,
    {
      method: "GET",
    }
  );
}