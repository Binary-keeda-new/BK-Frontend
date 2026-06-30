const API_URL =
  'http://localhost:5000/api/v1/coding-problems';

export async function getCodingProblem(
  problemId: string
) {
  const response = await fetch(
    `${API_URL}/${problemId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to fetch problem'
    );
  }

  return data.data;
}