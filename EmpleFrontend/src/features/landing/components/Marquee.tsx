const pills = [
  { icon: '🎯', label: 'ATS Resume Scanner' },
  { icon: '🤖', label: 'AI Mock Interviews' },
  { icon: '📊', label: 'Skill Analytics' },
  { icon: '🗺️', label: 'Career Roadmaps' },
  { icon: '🔥', label: 'Daily Streaks' },
  { icon: '🏆', label: 'Leaderboards' },
  { icon: '💰', label: 'Salary Insights' },
  { icon: '📝', label: 'Practice Tests' },
  { icon: '🛒', label: 'Tech Shop' },
  { icon: '🎓', label: 'University Rankings' },
]

export default function Marquee() {
  // Duplicate for seamless loop
  const allPills = [...pills, ...pills]

  return (
    <div className="marquee-band">
      <div className="marquee-track">
        {allPills.map((pill, i) => (
          <div key={i} className="marquee-pill">
            <span className="pill-icon">{pill.icon}</span>
            {pill.label}
          </div>
        ))}
      </div>
    </div>
  )
}
