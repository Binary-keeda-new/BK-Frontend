const BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function getAllProducts() {
  const res = await fetch(`${BASE}/api/v1/tech-shop`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const json = await res.json();
  return json.data;
}