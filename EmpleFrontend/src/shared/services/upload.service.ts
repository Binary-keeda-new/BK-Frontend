import { getSessionToken } from "@descope/nextjs-sdk/client";
import { parseJsonResponse } from "@/shared/utils/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type UploadImageResponse = {
  success: boolean;
  message: string;
  data: {
    url: string;
    filename: string;
  };
};

export async function uploadAdminImage(file: File, moduleName: string = 'misc'): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("module", moduleName);

  const headers: Record<string, string> = {};

  const token = getSessionToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}/api/v1/admin/uploads/image`, {
    method: "POST",
    headers,
    body: formData,
    credentials: "include",
  });

  const result = await parseJsonResponse<UploadImageResponse>(res);

  if (!result.data?.url) {
    throw new Error("Image upload failed");
  }

  if (result.data.url.startsWith("http")) {
    return result.data.url;
  }

  return `${API_BASE_URL}${result.data.url}`;
}