'use client'

import { Event } from '../types'

interface Props {
  event: Event
}

const TYPE_LABELS = {
  hackathon: 'Hackathon',
  techfest: 'Techfest',
  'our-hackathon': 'By Emple',
}

const TYPE_COLORS = {
  hackathon: { bg: 'rgba(241,90,34,0.12)', color: 'rgb(241,90,34)', border: 'rgba(241,90,34,0.15)' },
  techfest: { bg: 'rgba(168,85,247,0.12)', color: 'rgb(168,85,247)', border: 'rgba(168,85,247,0.15)' },
  'our-hackathon': { bg: 'rgba(16,185,129,0.12)', color: 'rgb(16,185,129)', border: 'rgba(16,185,129,0.15)' },
}

const formatDate = (d: string) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : null

export default function EventCard({ event }: Props) {
  const colors = TYPE_COLORS[event.type]
  const preview = event.description.length > 120
    ? event.description.slice(0, 120) + '…'
    : event.description
  const eventDate = formatDate(event.date)
  const startDate = formatDate(event.startDate)
  const endDate = formatDate(event.endDate)

  const hasValidLink =
    typeof event.registrationLink === 'string' &&
    event.registrationLink.startsWith('http')

  const handleCardClick = () => {
    if (hasValidLink) {
      window.open(event.registrationLink, '_blank')
    }
  }

  return (
    <article
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
        cursor: hasValidLink ? 'pointer' : 'default',
      }}
      onClick={handleCardClick}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(241,90,34,0.5)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1), 0 0 20px rgba(241,90,34,0.08)'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
      }}
    >
      {/* Banner / Fallback */}
      {event.banner ? (
        <div style={{
          width: '100%',
          height: 200,
          background: '#0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <img
            src={event.banner}
            alt={event.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>
      ) : (
        <div style={{
          width: '100%', height: 200,
          background: colors.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, fontWeight: 800, color: colors.color,
          letterSpacing: '-0.02em', fontFamily: "'Inter', sans-serif",
        }}>
          {event.title.slice(0, 2).toUpperCase()}
        </div>
      )}

      <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          <span style={{
            fontSize: 10, fontWeight: 800, padding: '3px 10px',
            borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em',
            background: colors.bg, color: colors.color, border: `1px solid ${colors.border}`,
          }}>
            {TYPE_LABELS[event.type]}
          </span>
          <span style={{
            fontSize: 10, fontWeight: 800, padding: '3px 10px',
            borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em',
            background: event.registrationOpen ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.06)',
            color: event.registrationOpen ? 'rgb(16,185,129)' : 'rgba(255,255,255,0.4)',
            border: event.registrationOpen ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(255,255,255,0.08)',
          }}>
            {event.registrationOpen ? 'Open' : 'Closed'}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          margin: '0 0 10px', fontSize: 17, fontWeight: 800,
          color: 'var(--text)', lineHeight: 1.4,
          fontFamily: "'Inter', sans-serif",
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {event.title}
        </h3>

        {/* Description */}
        <p style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.6, color: 'var(--muted)', flex: 1 }}>
          {preview}
        </p>

        {/* Registration dates */}
        {(startDate || endDate) && (
          <div style={{
            marginBottom: 12, padding: '10px 12px',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <p style={{
              fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6,
            }}>
              Registration Period
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {startDate && (
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                  From: <strong style={{ color: 'var(--text)' }}>{startDate}</strong>
                </span>
              )}
              {endDate && (
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                  To: <strong style={{ color: 'var(--text)' }}>{endDate}</strong>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Rewards — our-hackathon only */}
        {event.rewards && (
          <div style={{
            marginBottom: 12, padding: '8px 12px',
            background: 'rgba(16,185,129,0.08)',
            borderRadius: 10, border: '1px solid rgba(16,185,129,0.15)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 16 }}>🏆</span>
            <span style={{ fontSize: 13, color: 'rgb(16,185,129)', fontWeight: 600 }}>
              {event.rewards}
            </span>
          </div>
        )}

        {/* Important links — our-hackathon only */}
        {event.links && event.links.length > 0 && (
          <div style={{ marginBottom: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {event.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
                style={{
                  fontSize: 11, fontWeight: 700, padding: '3px 10px',
                  borderRadius: 20, textDecoration: 'none',
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'color 0.2s',
                }}
              >
                🔗 {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: 'auto', paddingTop: 14,
          borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>
            {eventDate}
          </span>
          {event.organiser && (
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>By {event.organiser}</span>
          )}
        </div>

      </div>
    </article>
  )
}