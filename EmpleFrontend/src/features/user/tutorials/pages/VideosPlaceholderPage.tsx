"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Play, FileText, Trophy, Search, Clock, Calendar, ArrowUpDown, ChevronDown, Brain, GraduationCap, Database, Network, Cpu, GitBranch, VideoOff } from "lucide-react";
import { fetchTutorials } from "../services/tutorials.service";

interface VideosPlaceholderPageProps {
  onBack: () => void;
}

interface HackathonItem {
  title: string;
  description: string;
  problemStatement: string;
  eligibility: string;
  rules: string[];
  rewards: string;
  organiser: string;
  date: string;
  url?: string;
}

interface TutorialVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  topics: string[];
  videoUrl: string;
  workbookUrl: string;
  duration: string;
  level: string;
  uploadDate: string;
  hackathonUrl?: string;
  hackathon?: HackathonItem | null;
}

type SubViewType = "categories" | "aiml" | "placement-categories" | "dbms" | "networks" | "os" | "dsa";

export default function VideosPlaceholderPage({ onBack }: VideosPlaceholderPageProps) {
  const [subView, setSubView] = useState<SubViewType>("categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest or oldest
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [videos, setVideos] = useState<TutorialVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutorials()
      .then(data => {
        setVideos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load video tutorials", err);
        setLoading(false);
      });
  }, []);

  const t: Record<string, string> = {
    border: 'var(--border)',
    surface: 'var(--surface)',
    surface2: 'var(--surface2)',
    text: 'var(--text)',
    muted: 'var(--muted2)',
    brand: '#a855f7', // Purple/Violet branding
  };

  const handleBackNavigation = () => {
    if (subView === "categories") {
      onBack();
    } else if (subView === "aiml" || subView === "placement-categories") {
      setSubView("categories");
      setSearchQuery("");
    } else {
      setSubView("placement-categories");
      setSearchQuery("");
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Dynamic matching functions based on video topics tags
  const isAiml = (video: TutorialVideo) => {
    if (!video.topics || !Array.isArray(video.topics)) return false;
    const tags = video.topics.map(x => x.toLowerCase());
    return tags.includes("ai") || tags.includes("machine learning") || tags.includes("aiml") || tags.includes("python") || tags.includes("data science");
  };

  const isDbms = (video: TutorialVideo) => {
    if (!video.topics || !Array.isArray(video.topics)) return false;
    const tags = video.topics.map(x => x.toLowerCase());
    return tags.includes("dbms") || tags.includes("sql") || tags.includes("database");
  };

  const isNetworks = (video: TutorialVideo) => {
    if (!video.topics || !Array.isArray(video.topics)) return false;
    const tags = video.topics.map(x => x.toLowerCase());
    return tags.includes("networks") || tags.includes("tcp/ip") || tags.includes("computer networks") || tags.includes("network");
  };

  const isOs = (video: TutorialVideo) => {
    if (!video.topics || !Array.isArray(video.topics)) return false;
    const tags = video.topics.map(x => x.toLowerCase());
    return tags.includes("os") || tags.includes("operating system") || tags.includes("operating systems");
  };

  const isDsa = (video: TutorialVideo) => {
    if (!video.topics || !Array.isArray(video.topics)) return false;
    const tags = video.topics.map(x => x.toLowerCase());
    return tags.includes("dsa") || tags.includes("data structures") || tags.includes("algorithms") || tags.includes("placement prep");
  };

  // Filter video list based on subView
  const getFilteredVideos = () => {
    let list = videos;
    if (subView === "aiml") {
      list = videos.filter(isAiml);
    } else if (subView === "dbms") {
      list = videos.filter(isDbms);
    } else if (subView === "networks") {
      list = videos.filter(isNetworks);
    } else if (subView === "os") {
      list = videos.filter(isOs);
    } else if (subView === "dsa") {
      list = videos.filter(isDsa);
    } else {
      return [];
    }

    if (searchQuery) {
      list = list.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        video.topics.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return list.sort((a, b) => {
      const dateA = new Date(a.uploadDate).getTime();
      const dateB = new Date(b.uploadDate).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
  };

  const filteredVideos = getFilteredVideos();

  // Base count of videos belonging to the current subView (before search query is applied)
  const getBaseVideoCount = () => {
    if (subView === "aiml") return videos.filter(isAiml).length;
    if (subView === "dbms") return videos.filter(isDbms).length;
    if (subView === "networks") return videos.filter(isNetworks).length;
    if (subView === "os") return videos.filter(isOs).length;
    if (subView === "dsa") return videos.filter(isDsa).length;
    return 0;
  };

  const baseVideoCount = getBaseVideoCount();

  // Get Page Titles & Subtitles based on subView
  const getHeaderInfo = () => {
    switch (subView) {
      case "categories":
        return {
          title: "Video",
          span: "Tutorials",
          desc: "Choose a technology domain to view interactive video guides and workbook exercises."
        };
      case "placement-categories":
        return {
          title: "Placement",
          span: "Prep Subjects",
          desc: "Ace your placements by choosing a core Computer Science subject or DSA topic."
        };
      case "aiml":
        return {
          title: "AI",
          span: "& Machine Learning",
          desc: "Step-by-step videos on ML algorithms, deep learning models, and Python data science packages."
        };
      case "dbms":
        return {
          title: "Database Management",
          span: "Systems (DBMS)",
          desc: "Master SQL queries, relational algebra, transactions, and normalization."
        };
      case "networks":
        return {
          title: "Computer",
          span: "Networks",
          desc: "Understand OSI model, transport protocols, IP routing, subnetting, and network security."
        };
      case "os":
        return {
          title: "Operating",
          span: "Systems",
          desc: "Deep dive into CPU scheduling, synchronization primitives, memory allocation, and disk scheduling."
        };
      case "dsa":
        return {
          title: "Data Structures",
          span: "& Algorithms (DSA)",
          desc: "Level up your problem-solving skills across arrays, strings, dynamic programming, and graph algorithms."
        };
      default:
        return {
          title: "Video",
          span: "Tutorials",
          desc: ""
        };
    }
  };

  const headerInfo = getHeaderInfo();

  // Selection cards definitions (with size and color matched to PracticeHome)
  const CATEGORIES = [
    {
      id: "aiml",
      title: "AI & ML",
      description: "Learn artificial intelligence, machine learning pipelines, and model evaluation.",
      icon: <Brain size={28} strokeWidth={2} />,
      thumbnail: "/images/aiml_thumbnail.png",
      topics: ["AI", "Machine Learning", "Python", "Data Science"],
      color: "#10b981", // Green
    },
    {
      id: "placement-categories",
      title: "Placement Prep",
      description: "Targeted SDE placement roadmap, coding practice, and mock interviews.",
      icon: <GraduationCap size={28} strokeWidth={2} />,
      thumbnail: "/images/placement_thumbnail.png",
      topics: ["DBMS", "Networks", "OS", "DSA", "Interviews"],
      color: "#6c63ff", // Purple/Blue
    }
  ];

  const PLACEMENT_SUBJECTS = [
    {
      id: "dbms",
      title: "DBMS",
      description: "Master SQL normalization, indexing, database architecture, and transactions.",
      icon: <Database size={28} strokeWidth={2} />,
      topics: ["SQL", "Normalization", "Indexes", "Transactions"],
      color: "#3b82f6", // Blue
    },
    {
      id: "networks",
      title: "Networks",
      description: "Master OSI layers, transport protocols, routing protocols, and security.",
      icon: <Network size={28} strokeWidth={2} />,
      topics: ["TCP/IP", "HTTP", "DNS", "Subnetting"],
      color: "#10b981", // Green
    },
    {
      id: "os",
      title: "OS",
      description: "Master memory allocation, CPU scheduling, thread synchronization, and deadlocks.",
      icon: <Cpu size={28} strokeWidth={2} />,
      topics: ["Processes", "Memory", "Scheduling", "Deadlocks"],
      color: "#f59e0b", // Amber
    },
    {
      id: "dsa",
      title: "DSA",
      description: "Interactive data structures and algorithms practice for coding interviews.",
      icon: <GitBranch size={28} strokeWidth={2} />,
      topics: ["Arrays", "Trees", "Graphs", "Dynamic Programming"],
      color: "#ec4899", // Pink
    }
  ];

  return (
    <div className="fade-in" style={{ padding: '24px 0', maxWidth: '1200px', margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'left', position: 'relative' }}>
      
      {/* Back Button */}
      <button 
        onClick={handleBackNavigation}
        style={{
          background: 'transparent',
          border: 'none',
          color: t.muted,
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 600,
          padding: 0,
          marginBottom: '32px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'color 0.2s'
        }}
        onMouseEnter={e => (e.currentTarget.style.color = t.text)}
        onMouseLeave={e => (e.currentTarget.style.color = t.muted)}
      >
        Back {subView === "categories" ? "to Tutorials" : subView === "placement-categories" ? "to Categories" : (subView === "aiml" ? "to Categories" : "to Subjects")}
      </button>

      {/* Header Section */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: "32px", fontWeight: 800, color: "var(--text)", marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {headerInfo.title} <span style={{ color: t.brand }}>{headerInfo.span}</span>
        </h1>
        <p style={{ color: t.muted, fontSize: "15px", marginTop: "4px" }}>
          {headerInfo.desc}
        </p>
      </div>

      {/* --- LEVEL 1: VIDEOS MAIN CATEGORIES --- */}
      {subView === "categories" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 360px))", gap: "20px" }}>
          {CATEGORIES.map((card) => (
            <div
              key={card.id}
              onClick={() => setSubView(card.id as SubViewType)}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.border = `1px solid ${card.color}`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${card.color}30`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid var(--border)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Thumbnail Image Header */}
                <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#090a0f", borderBottom: "1px solid var(--border)" }}>
                  <img
                    src={card.thumbnail}
                    alt={card.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  {/* Title & Icon row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "8px",
                      background: `${card.color}20`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: card.color,
                    }}>
                      {React.cloneElement(card.icon as React.ReactElement<any>, { size: 18 })}
                    </div>
                    <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)", margin: 0 }}>
                      {card.title}
                    </h2>
                  </div>

                  <p style={{ fontSize: "13px", color: "var(--muted2)", marginBottom: "16px", lineHeight: 1.5, minHeight: "39px", flexGrow: 1 }}>
                    {card.description}
                  </p>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
                    {card.topics.map((topic) => (
                      <span key={topic} style={{
                        fontSize: "11px", fontWeight: 600,
                        padding: "4px 10px", borderRadius: "999px",
                        background: `${card.color}15`,
                        color: card.color,
                        border: `1px solid ${card.color}30`,
                      }}>
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- LEVEL 2: PLACEMENT SUBJECT CATEGORIES --- */}
      {subView === "placement-categories" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 360px))", gap: "20px" }}>
          {PLACEMENT_SUBJECTS.map((card) => (
            <div
              key={card.id}
              onClick={() => setSubView(card.id as SubViewType)}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "24px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.border = `1px solid ${card.color}`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${card.color}30`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid var(--border)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: "52px", height: "52px", borderRadius: "12px",
                  background: `${card.color}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: card.color, marginBottom: "16px",
                }}>
                  {card.icon}
                </div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
                  {card.title}
                </h2>
                <p style={{ fontSize: "13px", color: "var(--muted2)", marginBottom: "16px", lineHeight: 1.5, minHeight: "39px", flexGrow: 1 }}>
                  {card.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
                  {card.topics.map((topic) => (
                    <span key={topic} style={{
                      fontSize: "11px", fontWeight: 600,
                      padding: "4px 10px", borderRadius: "999px",
                      background: `${card.color}15`,
                      color: card.color,
                      border: `1px solid ${card.color}30`,
                    }}>
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- LEVEL 2 / 3: VIDEOS LIST VIEW (AIML, DBMS, NETWORKS, OS, DSA) --- */}
      {subView !== "categories" && subView !== "placement-categories" && (
        <>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0', color: t.muted }}>
              Loading tutorials...
            </div>
          ) : baseVideoCount === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px dashed ${t.border}`,
              borderRadius: '24px',
              padding: '80px 24px',
              background: 'rgba(255, 255, 255, 0.01)',
              backdropFilter: 'blur(8px)',
              textAlign: 'center',
              marginTop: '12px'
            }}>
              {/* Glowing Icon Wrapper */}
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                color: '#c084fc',
                boxShadow: '0 8px 24px rgba(168, 85, 247, 0.1)'
              }}>
                <VideoOff size={28} />
              </div>

              {/* Status Badge */}
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#c084fc',
                background: 'rgba(168, 85, 247, 0.12)',
                padding: '4px 12px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
                border: '1px solid rgba(168, 85, 247, 0.2)'
              }}>
                Coming Soon
              </span>

              <h3 style={{ fontSize: '20px', color: 'white', fontWeight: 800, marginBottom: '8px', fontFamily: 'var(--font-syne, sans-serif)' }}>
                Upcoming Video Tutorials
              </h3>
              <p style={{ color: t.muted, fontSize: '14px', maxWidth: '360px', lineHeight: 1.5, margin: 0 }}>
                We are preparing high-quality lectures and workbooks for this subject.
              </p>
            </div>
          ) : (
            <>
              {/* Section Header with Count */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '16px' }}>
                <span style={{ 
                  color: t.muted, 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em' 
                }}>
                  Available Tutorials ({baseVideoCount})
                </span>
                <div style={{ flexGrow: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              </div>

              {/* Toolbar Search & Date Filters */}
              <div style={{
                display: 'flex',
                gap: 16,
                marginBottom: 36,
                flexWrap: 'wrap',
                alignItems: 'center',
                padding: '16px 20px',
                background: t.surface,
                borderRadius: 16,
                border: `1px solid ${t.border}`
              }}>
                {/* Search */}
                <div style={{
                  flex: '1 1 300px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Search size={18} style={{ position: 'absolute', left: 16, color: t.muted }} />
                  <input
                    type="text"
                    placeholder="Search by title or topic..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.2)',
                      border: `1px solid ${t.border}`,
                      borderRadius: 12,
                      padding: '12px 16px 12px 44px',
                      color: t.text,
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = t.brand}
                    onBlur={(e) => e.target.style.borderColor = t.border}
                  />
                </div>

                {/* Click-outside overlay for sort dropdown */}
                {isSortOpen && (
                  <div 
                    onClick={() => setIsSortOpen(false)}
                    style={{
                      position: 'fixed',
                      top: 0, left: 0, right: 0, bottom: 0,
                      zIndex: 998,
                      background: 'transparent'
                    }}
                  />
                )}

                {/* Custom Sort Dropdown */}
                <div style={{ position: 'relative', marginLeft: 'auto', zIndex: 999 }}>
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      background: 'rgba(255,255,255,0.02)',
                      border: `1px solid ${t.border}`,
                      borderRadius: 12,
                      padding: '10px 16px',
                      color: t.text,
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = t.brand}
                    onMouseLeave={e => { if (!isSortOpen) e.currentTarget.style.borderColor = t.border; }}
                  >
                    <ArrowUpDown size={14} style={{ color: t.brand }} />
                    <span>Sort by: Date Upload</span>
                    <ChevronDown size={14} style={{ color: t.muted, transform: isSortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>

                  {isSortOpen && (
                    <div style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      background: '#12131a',
                      border: `1px solid ${t.border}`,
                      borderRadius: 12,
                      padding: '6px',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
                      minWidth: '180px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4
                    }}>
                      <button
                        onClick={() => {
                          setSortBy("newest");
                          setIsSortOpen(false);
                        }}
                        style={{
                          background: sortBy === "newest" ? 'rgba(168,85,247,0.1)' : 'transparent',
                          color: sortBy === "newest" ? '#c084fc' : t.text,
                          border: 'none',
                          borderRadius: 8,
                          padding: '10px 12px',
                          textAlign: 'left',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => { if (sortBy !== "newest") e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                        onMouseLeave={e => { if (sortBy !== "newest") e.currentTarget.style.background = 'transparent'; }}
                      >
                        Newest to Oldest
                      </button>
                      <button
                        onClick={() => {
                          setSortBy("oldest");
                          setIsSortOpen(false);
                        }}
                        style={{
                          background: sortBy === "oldest" ? 'rgba(168,85,247,0.1)' : 'transparent',
                          color: sortBy === "oldest" ? '#c084fc' : t.text,
                          border: 'none',
                          borderRadius: 8,
                          padding: '10px 12px',
                          textAlign: 'left',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => { if (sortBy !== "oldest") e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                        onMouseLeave={e => { if (sortBy !== "oldest") e.currentTarget.style.background = 'transparent'; }}
                      >
                        Oldest to Newest
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Video Grid list */}
              {filteredVideos.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "28px" }}>
                  {filteredVideos.map((video) => (
                    <div
                      key={video.id}
                      style={{
                        background: t.surface,
                        border: `1px solid ${t.border}`,
                        borderRadius: '20px',
                        overflow: 'hidden',
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: 'relative',
                        minHeight: '220px'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = t.brand;
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = `0 12px 30px -10px ${t.brand}30`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = t.border;
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Details Content */}
                      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        {/* Title linked to videoUrl */}
                        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
                          <a
                            href={video.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'white', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = t.brand}
                            onMouseLeave={e => e.currentTarget.style.color = 'white'}
                          >
                            {video.title}
                          </a>
                        </h3>

                        {/* Metadata row (Upload Date, Duration, Level) */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: t.muted, fontSize: '11px', marginBottom: '12px', flexWrap: 'wrap' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <Calendar size={12} style={{ color: t.brand }} />
                            Uploaded: {formatDate(video.uploadDate)}
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <Clock size={12} style={{ color: t.brand }} />
                            {video.duration}
                          </span>
                          <span style={{
                            padding: '2px 6px', borderRadius: 4, fontSize: '9px',
                            fontWeight: 700, background: 'rgba(255,255,255,0.06)', color: 'white',
                            border: `1px solid ${t.border}`
                          }}>
                            {video.level}
                          </span>
                        </div>
                        
                        <p style={{ color: t.muted, fontSize: '13px', lineHeight: 1.5, marginBottom: '16px', flexGrow: 1 }}>
                          {video.description}
                        </p>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
                          <a
                            href={video.workbookUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              flex: 1,
                              background: 'rgba(255,255,255,0.03)',
                              color: t.text,
                              border: `1px solid ${t.border}`,
                              textDecoration: 'none',
                              fontWeight: 600,
                              fontSize: '12px',
                              padding: '10px 12px',
                              borderRadius: '10px',
                              textAlign: 'center',
                              transition: 'all 0.2s',
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                          >
                            <FileText size={13} /> Workbook
                          </a>

                          {/* Hackathon direct link */}
                          <a
                            href={video.hackathonUrl || video.hackathon?.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              flex: 1,
                              background: 'rgba(255,255,255,0.03)',
                              color: t.text,
                              border: `1px solid ${t.border}`,
                              textDecoration: 'none',
                              fontWeight: 600,
                              fontSize: '12px',
                              padding: '10px 12px',
                              borderRadius: '10px',
                              textAlign: 'center',
                              transition: 'all 0.2s',
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                          >
                            <Trophy size={13} /> Hackathons
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px dashed ${t.border}`,
                  borderRadius: '24px',
                  padding: '80px 24px',
                  background: 'rgba(255, 255, 255, 0.01)',
                  backdropFilter: 'blur(8px)',
                  textAlign: 'center',
                  marginTop: '12px'
                }}>
                  {/* Glowing Icon Wrapper */}
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '20px',
                    background: 'rgba(168, 85, 247, 0.06)',
                    border: '1px solid rgba(168, 85, 247, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    color: t.muted,
                  }}>
                    <VideoOff size={28} />
                  </div>

                  <h3 style={{ fontSize: '20px', color: 'white', fontWeight: 800, marginBottom: '8px', fontFamily: 'var(--font-syne, sans-serif)' }}>
                    No Video Tutorials Found
                  </h3>
                  <p style={{ color: t.muted, fontSize: '14px', maxWidth: '360px', lineHeight: 1.5, margin: 0 }}>
                    Try adjusting your search keywords.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
