// siteRoutes.ts

export interface SiteRoute {
  label: string;
  path: string;
  description: string;
  keywords: string[];
}

interface TagDef {
  label: string;
  keywords: string[];
  description?: string;
  path?: string; // overrides parent path when the tag has its own real route
}

interface PageDef {
  label: string;
  path: string;
  description: string;
  keywords: string[];   // base keywords for the page itself
  tags?: TagDef[];       // individual tags/subjects/chips shown on that page
}

// ─── Single source of truth ────────────────────────────────────────────────
// Every page + every tag chip lives here ONCE. Add a new tag chip to a page
// in the UI? Add it here too, in the same place — the search index is
// generated automatically below, so nothing can silently fall out of sync.

const PAGES: PageDef[] = [
  {
    label: "Dashboard",
    path: "/user/dashboard",
    description: "Your activity calendar, leaderboard, and submissions.",
    keywords: ["dashboard", "home", "overview", "leaderboard", "rank", "calendar", "submissions", "activity"],
  },
  {
    label: "Jobs",
    path: "/jobs",
    description: "Browse and apply to job listings.",
    keywords: ["jobs", "job", "career", "apply", "hiring", "vacancy", "openings", "job listing"],
  },
  {
    label: "AI Interview",
    path: "/user/ai-interview",
    description: "Practice interviews with an AI interviewer.",
    keywords: ["ai interview", "mock interview", "interview practice", "ai mock interview"],
  },
  {
    label: "Interview Practice",
    path: "/user/interview",
    description: "Practice real interview questions and sessions.",
    keywords: ["interview", "interviews", "interview prep", "practice interview"],
  },
  {
    label: "ATS Scanner",
    path: "/user/ats",
    description: "Scan your resume against job descriptions for ATS compatibility.",
    keywords: ["ats", "resume scanner", "resume check", "cv scanner", "ats scanner", "resume score"],
    tags: [
      { label: "AI Resume Scan", path: "/user/ats/ai", keywords: ["ai resume", "ai ats", "smart resume scan"] },
      { label: "Standard Resume Scan", path: "/user/ats/standard", keywords: ["standard ats", "basic resume check"] },
    ],
  },
  {
    label: "Practice",
    path: "/user/practice",
    description: "Practice coding problems, quizzes, and tests.",
    keywords: ["practice", "coding problems", "solve", "code", "dsa", "exercises"],
    tags: [
      { label: "Quizzes", path: "/user/practice/quiz", keywords: ["quiz", "quizzes", "mcq", "test yourself"] },
      { label: "Tests", path: "/user/practice/test", keywords: ["test", "tests", "mock test", "exam"] },
    ],
  },
  {
    label: "Learning Roadmaps",
    path: "/user/resources/roadmaps",
    description: "Browse curated roadmaps or build your own personalized one.",
    keywords: ["roadmap", "roadmaps", "learning path", "curriculum", "study plan", "personalized roadmap", "create roadmap"],
    tags: [
      { label: "Full Stack Roadmap", keywords: ["full stack", "fullstack", "mern", "web dev roadmap"] },
      { label: "AI/ML Roadmap", keywords: ["ai ml", "ai/ml", "machine learning roadmap"] },
      { label: "LLM Roadmap", keywords: ["llm", "large language model"] },
      { label: "DSA Roadmap", keywords: ["dsa", "data structures and algorithms"] },
      { label: "App Security Roadmap", keywords: ["app security", "application security"] },
      { label: "GRC Roadmap", keywords: ["grc", "governance risk compliance"] },
    ],
  },
  {
    label: "Resources",
    path: "/user/resources",
    description: "Access blogs, guides, and other learning resources.",
    keywords: ["resources", "resource", "study material"],
  },
  {
    label: "Blogs",
    path: "/user/resources/blogs",
    description: "Read articles and blog posts.",
    keywords: ["blog", "blogs", "articles", "reading"],
    tags: [
      { label: "Career Blogs", keywords: ["career blog", "career articles"] },
      { label: "Tech Blogs", keywords: ["tech blog", "technology articles"] },
      { label: "Interview Tips Blogs", keywords: ["interview tips", "interview advice"] },
    ],
  },
  {
    label: "BK SDE Sheet",
    path: "/user/resources/bk-sde-sheet",
    description: "Curated SDE preparation sheet.",
    keywords: ["sde sheet", "bk sheet", "dsa sheet", "coding sheet"],
    tags: [
      { label: "Aptitude", keywords: ["aptitude", "quant", "quantitative aptitude", "reasoning"] },
      { label: "Coding", keywords: ["coding", "dsa coding", "coding questions"] },
      { label: "OS", keywords: ["os", "operating systems"] },
      { label: "DBMS", keywords: ["dbms", "database"] },
      { label: "CN", keywords: ["cn", "computer networks"] },
    ],
  },
  {
    label: "GATE Notes",
    path: "/user/resources/gate-notes",
    description: "All GATE preparation notes and study material.",
    keywords: ["gate", "gate notes", "gate exam", "gate preparation"],
    tags: [
      { label: "Compiler Design", keywords: ["compiler design", "compilers"] },
      { label: "Computer Networks", keywords: ["computer networks", "networking", "networks"] },
      { label: "Computer Organisation & Architecture", keywords: ["computer organisation", "computer organization", "computer architecture"] },
      { label: "Combinatorics", keywords: ["combinatorics"] },
      { label: "Design & Analysis of Algorithms", keywords: ["design and analysis of algorithms", "daa", "algorithm analysis"] },
      { label: "Digital Logic Design", keywords: ["digital logic design", "digital logic", "logic design"] },
      { label: "Data Structures", keywords: ["data structures", "data structure"] },
      { label: "Engineering Mathematics", keywords: ["engineering mathematics", "maths", "mathematics"] },
      { label: "Graph Theory", keywords: ["graph theory", "graphs"] },
      { label: "Operating Systems", keywords: ["operating systems", "operating system"] },
      { label: "Propositional Logic", keywords: ["propositional logic"] },
      { label: "Set Theory", keywords: ["set theory", "sets"] },
      { label: "Theory of Computation", keywords: ["theory of computation", "automata"] },
    ],
  },
  {
    label: "Interview Questions",
    path: "/user/resources/interview-questions",
    description: "Top interview questions across all subjects.",
    keywords: ["interview questions", "interview qna", "technical questions"],
    tags: [
      { label: "OOP", path: "/user/resources/interview-questions/oop", keywords: ["oop", "object oriented programming", "oops"] },
      { label: "DBMS", path: "/user/resources/interview-questions/dbms", keywords: ["dbms", "database", "sql interview"] },
      { label: "Computer Networks", path: "/user/resources/interview-questions/cn", keywords: ["cn interview", "computer networks interview", "networking interview"] },
      { label: "Operating Systems", path: "/user/resources/interview-questions/os", keywords: ["os interview", "operating systems interview"] },
      { label: "Machine Learning", path: "/user/resources/interview-questions/ml", keywords: ["ml interview", "machine learning interview"] },
      { label: "DevOps", path: "/user/resources/interview-questions/devops", keywords: ["devops interview"] },
      { label: "Cyber Security", path: "/user/resources/interview-questions/cyber", keywords: ["cyber security interview", "cybersecurity interview"] },
      { label: "System Design", path: "/user/resources/interview-questions/system-design", keywords: ["system design interview", "hld", "lld"] },
    ],
  },
  {
    label: "Project Ideas",
    path: "/user/resources/project-ideas",
    description: "Curated project ideas across domains.",
    keywords: ["project ideas", "projects", "project", "portfolio project"],
    tags: [
      { label: "Full Stack", path: "/user/resources/project-ideas/fullstack", keywords: ["full stack project", "fullstack project", "web dev project"] },
      { label: "AI/ML", path: "/user/resources/project-ideas/aiml", keywords: ["ai ml project", "machine learning project"] },
      { label: "Cybersecurity", path: "/user/resources/project-ideas/cybersecurity", keywords: ["cybersecurity project", "security project"] },
    ],
  },
  {
    label: "Certificates",
    path: "/user/resources/certificates",
    description: "Explore certifications across AWS, Cisco, Google Cloud, and more.",
    keywords: ["certificate", "certificates", "certification"],
    tags: [
      { label: "AWS", keywords: ["aws", "amazon web services"] },
      { label: "Cisco", keywords: ["cisco", "ccna"] },
      { label: "Google Cloud", keywords: ["google cloud", "gcp"] },
      { label: "TensorFlow", keywords: ["tensorflow"] },
      { label: "Red Hat", keywords: ["red hat", "redhat", "rhel"] },
      { label: "CUDA", keywords: ["cuda", "nvidia"] },
    ],
  },
  {
    label: "Career Paths",
    path: "/user/resources/career-paths",
    description: "Explore career paths with roadmaps, salaries, and quizzes.",
    keywords: ["career", "career path", "career paths", "career options"],
    tags: [
      { label: "Business Analyst", keywords: ["business analyst", "ba career"] },
      { label: "Data Analyst", keywords: ["data analyst", "data analytics career"] },
      { label: "Testing", keywords: ["testing career", "qa career", "software testing"] },
    ],
  },
  {
    label: "Events",
    path: "/user/events",
    description: "See upcoming events, hackathons, and webinars.",
    keywords: ["events", "event", "hackathon", "hackathons", "webinar", "workshop", "meetup"],
  },
  {
    label: "Sessions",
    path: "/user/sessions",
    description: "Book or view your counselling/mentorship sessions.",
    keywords: ["sessions", "session", "counselling", "counseling", "mentor", "mentorship"],
  },
  {
    label: "Tech Shop",
    path: "/user/tech-shop",
    description: "Redeem your points for tech merchandise and rewards.",
    keywords: ["tech shop", "shop", "store", "redeem", "rewards", "points", "merchandise"],
  },
  {
    label: "Profile Settings",
    path: "/user/profile",
    description: "Update your profile information and settings.",
    keywords: ["profile", "settings", "account", "edit profile"],
  },
  {
    label: "Transactions",
    path: "/user/transactions",
    description: "View your transaction and points history.",
    keywords: ["transactions", "transaction", "payment history", "points history"],
  },
  {
    label: "Tutorials",
    path: "/user/tutorials",
    description: "Watch guided tutorials.",
    keywords: ["tutorial", "tutorials", "how to", "guide"],
  },
  {
    label: "Java Tutorial",
    path: "/user/tutorials",
    description: "From Tutorials, tap 'Notes' then 'Java Programming'.",
    keywords: ["java", "java programming", "java basics", "java oop", "java tutorial", "variables", "loops", "arrays", "classes", "exception handling", "collections", "multithreading"],
  },
  {
    label: "C Tutorial",
    path: "/user/tutorials",
    description: "From Tutorials, tap 'Notes' then 'C Programming'.",
    keywords: ["c programming", "c language", "c tutorial", "c basics"],
  },
  {
    label: "DAA Tutorial",
    path: "/user/tutorials",
    description: "From Tutorials, tap 'Notes' then 'DAA'.",
    keywords: ["daa", "design and analysis of algorithms", "algorithms tutorial"],
  },
];

// ─── Auto-generate the flat search index from PAGES ────────────────────────
// Every tag becomes its own searchable entry pointing at the parent page's
// path (or its own path, if one is specified). This is the step that makes
// "add a tag once, it's searchable everywhere" actually true.

function buildSiteRoutes(pages: PageDef[]): SiteRoute[] {
  const routes: SiteRoute[] = [];
  for (const page of pages) {
    routes.push({
      label: page.label,
      path: page.path,
      description: page.description,
      keywords: page.keywords,
    });
    for (const tag of page.tags ?? []) {
      routes.push({
        label: `${tag.label} — ${page.label}`,
        path: tag.path ?? page.path,
        description: tag.description ?? `${tag.label} under ${page.label}.`,
        keywords: tag.keywords,
      });
    }
  }
  return routes;
}

export const SITE_ROUTES: SiteRoute[] = buildSiteRoutes(PAGES);

// ─── Search ─────────────────────────────────────────────────────────────
// Word-boundary matching instead of raw substring checks. This is what
// fixes false positives like "full stack" matching "Set Theory" — the old
// code did q.includes(kw), and "full stack".includes("st") is true because
// "st" is a substring of "stack". Word-boundary regex matches "st" only
// when it appears as its own token, not buried inside another word.

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasWholeWordMatch(haystack: string, needle: string): boolean {
  if (needle.length < 2) return false;
  const pattern = new RegExp(`\\b${escapeRegExp(needle)}\\b`, "i");
  return pattern.test(haystack);
}

export function searchSiteRoutes(query: string, maxResults = 8): SiteRoute[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const scored = SITE_ROUTES.map((route) => {
    let score = 0;
    const label = route.label.toLowerCase();

    if (label === q) score += 10;
    else if (hasWholeWordMatch(label, q)) score += 5;
    else if (label.includes(q) && q.length >= 3) score += 2;

    route.keywords.forEach((kw) => {
      const kwLower = kw.toLowerCase();
      if (q === kwLower) {
        score += 6; // exact keyword match
      } else if (hasWholeWordMatch(q, kwLower) || hasWholeWordMatch(kwLower, q)) {
        score += 4; // whole-word match either direction — safe at any length
      } else if (kwLower.length >= 4 && q.length >= 4 && (q.includes(kwLower) || kwLower.includes(q))) {
        score += 2; // substring fallback, gated to longer strings only
      }
    });

    return { route, score };
  });

  // Dynamic cutoff: keep everything within a reasonable margin of the top
  // score, instead of an arbitrary fixed count. This is what lets a query
  // like "full stack" return both the Roadmap AND the Project Ideas match
  // instead of one crowding out the other.
  const withMatches = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
  if (withMatches.length === 0) return [];

  const topScore = withMatches[0].score;
  const threshold = topScore * 0.5; // keep results at least half as strong as the best match
  const relevant = withMatches.filter((s) => s.score >= threshold);

  const seenPaths = new Set<string>();
  const deduped: SiteRoute[] = [];
  for (const { route } of relevant) {
    if (seenPaths.has(route.path)) continue;
    seenPaths.add(route.path);
    deduped.push(route);
    if (deduped.length >= maxResults) break;
  }

  return deduped;
}