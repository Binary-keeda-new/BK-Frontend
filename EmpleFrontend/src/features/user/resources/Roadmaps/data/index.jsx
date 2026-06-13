import grcRoadmap from './grcRoadmap';
import appSecurityRoadmap from './ApplicationSecurity';
import mlRoadmap from './MLRoadmap';
import llmRoadmap from './LLMRoadmap';
import fullStackRoadmap from './FullStackRoadmap';
import placementRoadmap from './placementRoadmap';
import daysOfCodeRoadmap from './120DaysOfCodeRoadmap';

export const roadmapsListingData = [
  {
    id: 'placement',
    slug: 'placement',
    name: 'Placement Sheet',
    description: 'Comprehensive preparation guide for campus placements with DSA and interview prep',
    domain: 'Career',
    category: 'Career',
    difficulty: 'Beginner',
    estimatedDuration: '2 months',
    sections: 12,
    targetUsers: ['Campus'],
    color: 'teal',
    points: 600,
    enrolled: 4231,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    )
  },
  {
    id: 'full-stack',
    slug: 'full-stack',
    name: 'Full Stack Roadmap',
    description: 'Complete web development journey from frontend to backend and deployment',
    domain: 'Web Development',
    category: 'Technical',
    difficulty: 'Intermediate',
    estimatedDuration: '3-6 months',
    sections: 12,
    targetUsers: ['Global BK', 'Campus'],
    color: 'orange',
    points: 800,
    enrolled: 2876,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
        <path d="M10 8l-2 2 2 2M14 8l2 2-2 2"/>
      </svg>
    )
  },
  {
    id: 'app-security',
    slug: 'app-security',
    name: 'Application Security',
    description: 'B.Tech CSE+CSF roadmap for becoming an Application Security Engineer',
    domain: 'Application Security',
    category: 'Technical',
    difficulty: 'Intermediate',
    estimatedDuration: '6 months',
    sections: 12,
    targetUsers: ['Global BK', 'Campus'],
    color: 'red',
    points: 1200,
    enrolled: 2103,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    )
  },
  {
    id: 'ai-ml',
    slug: 'ai-ml',
    name: 'AI/ML Roadmap',
    description: 'Master machine learning from fundamentals to real-world projects with hands-on experience',
    domain: 'Artificial Intelligence',
    category: 'Technical',
    difficulty: 'Intermediate',
    estimatedDuration: '3 months',
    sections: 15,
    targetUsers: ['Global BK', 'Campus'],
    color: 'blue',
    points: 750,
    enrolled: 1240,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <rect x="9" y="9" width="6" height="6"/>
        <line x1="9" y1="1" x2="9" y2="4"/>
        <line x1="15" y1="1" x2="15" y2="4"/>
        <line x1="9" y1="20" x2="9" y2="23"/>
        <line x1="15" y1="20" x2="15" y2="23"/>
        <line x1="20" y1="9" x2="23" y2="9"/>
        <line x1="20" y1="15" x2="23" y2="15"/>
        <line x1="1" y1="9" x2="4" y2="9"/>
        <line x1="1" y1="15" x2="4" y2="15"/>
      </svg>
    )
  },
  {
    id: 'llm',
    slug: 'llm',
    name: 'LLM Roadmap',
    description: 'Deep dive into Large Language Models, transformers, and modern NLP techniques',
    domain: 'Natural Language Processing',
    category: 'Technical',
    difficulty: 'Advanced',
    estimatedDuration: '2 months',
    sections: 12,
    targetUsers: ['Global BK'],
    color: 'purple',
    points: 600,
    enrolled: 856,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
        <path d="M12 5v14"/>
        <path d="M12 12h6"/>
        <path d="M12 12H6"/>
      </svg>
    )
  },
  {
    id: 'grc',
    slug: 'grc',
    name: 'GRC Roadmap',
    description: 'Complete roadmap for transitioning to a Governance, Risk, and Compliance role in cybersecurity',
    domain: 'Cybersecurity Governance',
    category: 'Technical',
    difficulty: 'Beginner',
    estimatedDuration: '3 months',
    sections: 8,
    targetUsers: ['Global BK'],
    color: 'blue',
    points: 800,
    enrolled: 1240,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M12 8v4"/><path d="M12 16h.01"/>
      </svg>
    )
  },
  {
    id: '120-days-of-code',
    slug: '120-days-of-code',
    name: '120 Days of Code',
    description: 'Master Data Structures & Algorithms and programming step-by-step over 120 days.',
    domain: 'DSA & Algorithms',
    category: 'Technical',
    difficulty: 'Intermediate',
    estimatedDuration: '4 months',
    sections: 10,
    targetUsers: ['Global BK', 'Campus'],
    color: 'orange',
    points: 1200,
    enrolled: 1540,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    )
  }
];

export const getRoadmapById = (roadmapId, duration = '6 months') => {
  const roadmapMap = {
    'grc': grcRoadmap,
    'app-security': appSecurityRoadmap,
    'ai-ml': mlRoadmap,
    'llm': llmRoadmap,
    'full-stack': fullStackRoadmap,
    'placement': placementRoadmap,
    '120-days-of-code': daysOfCodeRoadmap,
  };
  
  const baseRoadmap = roadmapMap[roadmapId];
  if (!baseRoadmap) return null;

  // Resolve if it's a function (factory pattern)
  const resolvedBase = typeof baseRoadmap === 'function' ? baseRoadmap() : baseRoadmap;

  // Handle roadmaps with durations
  if (resolvedBase.durations) {
    let resolvedDuration = duration;
    let durData = resolvedBase.durations[duration];
    if (!durData) {
      const availableDurations = Object.keys(resolvedBase.durations);
      if (availableDurations.length > 0) {
        resolvedDuration = availableDurations[0];
        durData = resolvedBase.durations[resolvedDuration];
      }
    }
    if (durData) {
      return {
        ...resolvedBase,
        ...durData,
        activeDuration: resolvedDuration,
        totalSections: durData.sections?.length || 0
      };
    }
  }

  // Handle single duration roadmaps
  return {
    ...resolvedBase,
    totalSections: resolvedBase.sections?.length || 0
  };
};

export default { roadmapsListingData, getRoadmapById };