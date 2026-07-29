import { getSessionToken } from "@descope/nextjs-sdk/client";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function getAllProducts() {
  const token = getSessionToken();

  if (!token) {
    throw new Error("No authentication token found. Please log in again.");
  }

  const res = await fetch(`${BASE}/api/v1/tech-shop`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("Failed to fetch products:", {
      status: res.status,
      response: json,
    });

    throw new Error(
      json?.message || `Failed to fetch products (${res.status})`
    );
  }

  return json.data;
}