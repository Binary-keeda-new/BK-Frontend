import React, { useState } from 'react';

const SectionCard = ({
  section,
  isCompleted,
  onStartQuiz,
  progressDetails = {},
  onUpdateProgressDetails,
  roadmapId
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const t = {
    border: 'var(--border)',
    surface: 'var(--surface)',
    surface2: 'var(--surface2)',
    text: 'var(--text)',
    muted: 'var(--muted2)',
    brand: 'var(--orange)',
    quizProgressBg: 'var(--surface2)',
  };

  const isNewSchema = section.resources && !Array.isArray(section.resources);

  const isContentCompleted = progressDetails.completedContent?.includes(section.id) || false;
  const viewedWebsites = progressDetails.viewedWebsites?.[section.id] || [];
  const watchedVideos = progressDetails.watchedVideos?.[section.id] || [];
  const passedQuizzes = progressDetails.passedQuizzes?.[section.id] || { easy: false, medium: false, hard: false };

  const getProgressStatus = () => {
    if (isCompleted) return 'completed';
    
    if (isNewSchema) {
      const hasStarted = isContentCompleted || 
                         viewedWebsites.length > 0 || 
                         watchedVideos.length > 0 || 
                         passedQuizzes.easy || 
                         passedQuizzes.medium || 
                         passedQuizzes.hard;
      if (hasStarted) return 'in-progress';
    }
    return 'not-attempted';
  };
  
  const status = getProgressStatus();

  let websites = [];
  let videos = [];
  if (section.resources) {
    if (Array.isArray(section.resources)) {
      section.resources.forEach(r => {
        const isVideo = r.type === 'yt' || r.type === 'video' || (r.url && (r.url.includes('youtube.com') || r.url.includes('youtu.be')));
        if (isVideo) {
          videos.push({
            title: r.title,
            url: r.url,
            dur: r.dur || r.duration || 'Variable'
          });
        } else {
          websites.push({
            title: r.title,
            url: r.url
          });
        }
      });
    } else {
      websites = section.resources.websites || [];
      videos = section.resources.videos || [];
    }
  }

  const handleWebsiteClick = (url) => {
    if (!onUpdateProgressDetails) return;
    if (viewedWebsites.includes(url)) return;
    
    const newWebsites = [...viewedWebsites, url];
    onUpdateProgressDetails({
      ...progressDetails,
      viewedWebsites: {
        ...progressDetails.viewedWebsites,
        [section.id]: newWebsites
      }
    });
  };

  const handleVideoWatched = (url) => {
    if (!onUpdateProgressDetails) return;
    if (watchedVideos.includes(url)) return;

    const newVideos = [...watchedVideos, url];
    onUpdateProgressDetails({
      ...progressDetails,
      watchedVideos: {
        ...progressDetails.watchedVideos,
        [section.id]: newVideos
      }
    });
  };

  const handleContentToggle = (e) => {
    if (!onUpdateProgressDetails) return;
    const isChecked = e.target.checked;
    
    let newCompletedContent = progressDetails.completedContent || [];
    if (isChecked) {
      if (!newCompletedContent.includes(section.id)) {
        newCompletedContent = [...newCompletedContent, section.id];
      }
    } else {
      newCompletedContent = newCompletedContent.filter(id => id !== section.id);
    }

    onUpdateProgressDetails({
      ...progressDetails,
      completedContent: newCompletedContent
    });
  };

  const handleResourceClick = (e, resource) => {
    if (resource.type === 'yt' || resource.type === 'video' || (resource.url && (resource.url.includes('youtube.com') || resource.url.includes('youtu.be')))) {
      e.preventDefault();
      setSelectedVideo(resource.url);
    }
  };

  const getEmbedUrl = (url) => {
    let embedUrl = url;
    if (url.includes('youtube.com/watch?v=')) {
      embedUrl = url.replace('watch?v=', 'embed/');
      const ampersandIndex = embedUrl.indexOf('&');
      if (ampersandIndex !== -1) {
        embedUrl = embedUrl.substring(0, ampersandIndex);
      }
    } else if (url.includes('youtu.be/')) {
      embedUrl = url.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    return embedUrl;
  };

  return (
    <div 
      className={`roadmap-section-card ${status}`}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${
          status === 'completed' 
            ? '#10b981' 
            : status === 'in-progress'
              ? 'var(--orange)'
              : 'var(--border)'
        }`,
        borderRadius: '20px',
        marginBottom: '20px',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
        overflow: 'hidden',
        boxShadow: status === 'completed' 
          ? '0 4px 20px rgba(16, 185, 129, 0.06)' 
          : status === 'in-progress'
            ? '0 4px 20px rgba(241, 90, 34, 0.12)' 
            : 'none'
      }}
    >
      {/* Header */}
      <div
        className="roadmap-section-card-header"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          padding: '22px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
          {/* Checkbox / Circle Icon */}
          {status === 'in-progress' ? (
            <div 
              onClick={(e) => e.stopPropagation()}
              className="animated-circle-border"
              style={{
                width: 32, height: 32,
                flexShrink: 0,
                cursor: 'default'
              }}
            >
              <div className="animated-circle-border-inner">
                <div className="status-dot-orange" />
              </div>
            </div>
          ) : (
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 32, height: 32,
                border: `2px solid ${status === 'completed' ? '#10b981' : 'var(--border)'}`,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                background: 'rgba(255, 255, 255, 0.03)',
                transition: 'all 0.2s',
                boxShadow: status === 'completed' ? '0 0 10px rgba(16, 185, 129, 0.2)' : 'none',
                cursor: 'default'
              }}
            >
              <div className={status === 'completed' ? 'status-dot-green' : 'status-dot-grey'} />
            </div>
          )}

          {/* Info */}
          <div>
            <h3 style={{
              fontSize: 18, fontWeight: 700,
              color: 'var(--text)', marginBottom: 8
            }}>
              {section.week || `Section ${section.id}`}: {section.title}
            </h3>
            <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--muted)', fontWeight: 500, alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--orange)' }}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {section.duration || section.week || 'Variable'}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--orange)' }}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {section.points} points
              </span>
            </div>
          </div>
        </div>

        {/* Expand button */}
        <button style={{
          width: 36, height: 36,
          border: '1.5px solid var(--border)',
          borderRadius: '50%',
          background: 'var(--surface2)',
          cursor: 'pointer',
          fontSize: 20,
          color: 'var(--text)',
          transition: 'all 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0
        }}>
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div style={{
          padding: '0 28px 28px 76px',
          borderTop: '1px solid var(--border)',
          paddingTop: 24
        }}>
          {/* Learning Objectives */}
          {roadmapId !== '120-days-of-code' && (section.objectives || section.learningObjectives) && (
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--brand)', marginBottom: 12 }}>
                Learning Objectives
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {(section.objectives || section.learningObjectives).map((obj, i) => (
                  <li key={i} style={{
                    padding: '8px 0 8px 24px',
                    position: 'relative',
                    color: 'var(--text)',
                    fontSize: 14
                  }}>
                    <span style={{
                      position: 'absolute', left: 0,
                      color: 'var(--brand)', fontWeight: 700
                    }}>→</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Content */}
          <div
            className="roadmap-content"
            style={{ marginBottom: 24 }}
            dangerouslySetInnerHTML={{ __html: section.content }}
          />

          {/* Content completion checkbox (only for new schema) */}
          {isNewSchema && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              margin: '24px 0', padding: 14,
              background: isContentCompleted ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
              border: `1.5px dashed ${isContentCompleted ? '#10b981' : 'var(--border)'}`,
              borderRadius: 12
            }}>
              <input
                type="checkbox"
                id={`check-content-${section.id}`}
                checked={isContentCompleted}
                onChange={handleContentToggle}
                style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#10b981' }}
              />
              <label htmlFor={`check-content-${section.id}`} style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', cursor: 'pointer' }}>
                I have finished reading the learning content of this module
              </label>
            </div>
          )}

          {/* Recommended Websites */}
          {websites.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--brand)', marginBottom: 12 }}>
                Recommended Websites
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                {websites.map((web, i) => {
                  const isVisited = viewedWebsites.includes(web.url);
                  return (
                    <a
                      key={i}
                      href={web.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleWebsiteClick(web.url)}
                      className="roadmap-resource-card"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '18px',
                        background: 'var(--surface2)',
                        borderRadius: '14px',
                        textDecoration: 'none',
                        color: 'var(--text)',
                        transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.25s ease, box-shadow 0.25s ease',
                        fontSize: '14px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: `1px solid ${isVisited ? '#10b981' : 'var(--border)'}`,
                        minHeight: '110px'
                      }}
                    >
                      <span style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 12, display: 'block', lineHeight: 1.4 }}>{web.title}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: isVisited ? '#10b981' : 'var(--brand)', marginTop: 'auto' }}>
                        {isVisited ? 'Visited ✓' : 'Visit Site →'}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recommended YouTube Videos */}
          {videos.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--brand)', marginBottom: 12 }}>
                Recommended YouTube Videos
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
                {videos.map((vid, i) => {
                  const isWatched = watchedVideos.includes(vid.url);
                  const embedUrl = getEmbedUrl(vid.url);
                  return (
                    <div
                      key={i}
                      className="roadmap-video-card"
                      style={{
                        background: 'var(--surface2)',
                        border: '1px solid var(--border)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.25s ease, box-shadow 0.25s ease'
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', height: 0 }}>
                        <iframe
                          src={embedUrl}
                          title={vid.title}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                          allowFullScreen
                        />
                      </div>
                      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12, flex: 1, lineHeight: 1.4 }}>
                          {vid.title}
                        </span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                          <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--orange)' }}>
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {vid.dur || vid.duration}
                          </span>
                          <button
                            onClick={() => handleVideoWatched(vid.url)}
                            className="quiz-btn"
                            style={{
                              padding: '8px 16px',
                              borderRadius: '50px',
                              border: 'none',
                              fontSize: '12px',
                              fontWeight: '700',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              color: '#fff',
                              transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, opacity 0.2s ease',
                              background: isWatched ? '#10b981' : 'var(--brand)',
                              boxShadow: isWatched ? 'none' : '0 4px 12px rgba(241, 90, 34, 0.25)'
                            }}
                          >
                            {isWatched ? 'Watched ✓' : 'Mark Watched'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Module Quiz Section */}
          {isNewSchema ? (
            <div className="roadmap-quiz-box" style={{
              marginTop: '28px',
              padding: '24px',
              background: 'var(--surface2)',
              borderRadius: '16px',
              border: '1px solid var(--border)'
            }}>
              <h4 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>
                Module Quizzes
              </h4>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 18, lineHeight: 1.5 }}>
                Quizzes are mandatory. You must pass them in sequence (Easy → Medium → Hard) to complete the module.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {/* Easy */}
                <button
                  onClick={() => onStartQuiz(section, 'easy')}
                  className="quiz-btn"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '50px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#fff',
                    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, opacity 0.2s ease',
                    background: passedQuizzes.easy ? '#10b981' : 'linear-gradient(135deg, var(--brand) 0%, #ff8c5a 100%)',
                    boxShadow: passedQuizzes.easy ? 'none' : '0 4px 12px rgba(241, 90, 34, 0.25)'
                  }}
                >
                  {passedQuizzes.easy ? '✓' : '📝'} Easy Quiz {passedQuizzes.easy ? '(Passed)' : ''}
                </button>

                {/* Medium */}
                <button
                  onClick={() => passedQuizzes.easy && onStartQuiz(section, 'medium')}
                  disabled={!passedQuizzes.easy}
                  className="quiz-btn"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '50px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#fff',
                    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, opacity 0.2s ease',
                    background: passedQuizzes.medium
                      ? '#10b981'
                      : passedQuizzes.easy
                        ? 'linear-gradient(135deg, var(--brand) 0%, #ff8c5a 100%)'
                        : '#272730',
                    boxShadow: passedQuizzes.medium || !passedQuizzes.easy ? 'none' : '0 4px 12px rgba(241, 90, 34, 0.25)'
                  }}
                >
                  {passedQuizzes.medium ? '✓' : passedQuizzes.easy ? '📝' : '🔒'} Medium Quiz {passedQuizzes.medium ? '(Passed)' : ''}
                </button>

                {/* Hard */}
                <button
                  onClick={() => passedQuizzes.medium && onStartQuiz(section, 'hard')}
                  disabled={!passedQuizzes.medium}
                  className="quiz-btn"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '50px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#fff',
                    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, opacity 0.2s ease',
                    background: passedQuizzes.hard
                      ? '#10b981'
                      : passedQuizzes.medium
                        ? 'linear-gradient(135deg, var(--brand) 0%, #ff8c5a 100%)'
                        : '#272730',
                    boxShadow: passedQuizzes.hard || !passedQuizzes.medium ? 'none' : '0 4px 12px rgba(241, 90, 34, 0.25)'
                  }}
                >
                  {passedQuizzes.hard ? '✓' : passedQuizzes.medium ? '📝' : '🔒'} Hard Quiz {passedQuizzes.hard ? '(Passed)' : ''}
                </button>
              </div>
            </div>
          ) : (
            (section.quiz || section.quizzes) && (
              <div style={{ marginTop: 24 }}>
                <button
                  onClick={() => onStartQuiz(section)}
                  className="quiz-btn"
                  style={{
                    padding: '12px 32px',
                    borderRadius: '50px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#fff',
                    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, opacity 0.2s ease',
                    background: 'linear-gradient(135deg, var(--brand) 0%, #ff8c5a 100%)',
                    boxShadow: '0 4px 12px rgba(241, 90, 34, 0.25)'
                  }}
                >
                  {isCompleted ? 'Retake Quiz' : 'Take Quiz'}
                </button>
              </div>
            )
          )}
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          onClick={(e) => { e.stopPropagation(); setSelectedVideo(null); }}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.85)', zIndex: 9999,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backdropFilter: 'blur(5px)'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%', maxWidth: '1000px', aspectRatio: '16/9', 
              background: '#000', position: 'relative', borderRadius: 16, 
              overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedVideo(null); }}
              style={{
                position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.2)', 
                color: 'white', border: 'none', borderRadius: '50%', width: 36, height: 36, 
                cursor: 'pointer', fontSize: 24, zIndex: 10, display: 'flex', 
                alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            >
              ×
            </button>
            <iframe 
              src={getEmbedUrl(selectedVideo)} 
              width="100%" height="100%" frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              title="Video Player"
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionCard;