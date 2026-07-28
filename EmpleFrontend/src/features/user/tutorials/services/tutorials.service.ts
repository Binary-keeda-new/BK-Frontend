const BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

const FALLBACK_TUTORIALS = [
  {
    id: "v1",
    title: "Introduction to Artificial Intelligence & Machine Learning",
    description: "Learn the core concepts of AI, Machine Learning algorithms, neural networks, and model training methodologies.",
    thumbnail: "/images/aiml_thumbnail.png",
    topics: ["AI", "Machine Learning", "Python", "Data Science"],
    videoUrl: "#",
    workbookUrl: "",
    duration: "3h 15m",
    level: "Intermediate",
    uploadDate: "2026-07-20T08:00:00.000Z",
    hackathonUrl: ""
  },
  {
    id: "v2",
    title: "SDE Placement Prep Roadmap & Coding Interviews",
    description: "Comprehensive preparation guide for coding interviews, covering data structures, algorithm design, and resume tips.",
    thumbnail: "/images/placement_thumbnail.png",
    topics: ["Placement Prep", "DSA", "Resume", "Interviews"],
    videoUrl: "#",
    workbookUrl: "",
    duration: "4h 45m",
    level: "Advanced",
    uploadDate: "2026-07-25T10:00:00.000Z",
    hackathonUrl: ""
  }
];

export async function fetchTutorials() {
  try {
    const res = await fetch(`${BASE}/api/v1/tutorials`, { cache: 'no-store' });
    if (!res.ok) {
      console.warn('API /api/v1/tutorials returned non-200, using local fallback data');
      return FALLBACK_TUTORIALS;
    }
    const json = await res.json();
    return json.data ?? FALLBACK_TUTORIALS;
  } catch (err) {
    console.warn('Failed to fetch tutorials from API, using local fallback data:', err);
    return FALLBACK_TUTORIALS;
  }
}
