export const parseJsonResponse = async <T>(res: Response): Promise<T> => {
  const contentType = res.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const text = await res.text();

    const cleaned = text
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    throw new Error(
      cleaned.slice(0, 140) || "Server did not return JSON"
    );
  }

  return res.json();
};