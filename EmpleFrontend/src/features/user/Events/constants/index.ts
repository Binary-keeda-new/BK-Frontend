import { EventType } from '../types'

export const EVENT_CATEGORIES = [
  {
    id: 'hackathon' as EventType,
    title: 'Hackathons',
    description: 'Browse external hackathons and coding competitions from top organisations.',
    badge: 'External',
    route: '/user/events/hackathons',       // ← add /user prefix
  },
  {
    id: 'techfest' as EventType,
    title: 'Techfest',
    description: 'Explore tech festivals with workshops, speaker sessions, and live competitions.',
    badge: 'Festival',
    route: '/user/events/techfest',         // ← add /user prefix
  },
  {
    id: 'our-hackathon' as EventType,
    title: 'Our Hackathons',
    description: 'Participate in hackathons exclusively hosted on the Emple platform.',
    badge: 'By Emple',
    route: '/user/events/our-hackathons',   // ← add /user prefix
  },
]

export const CATEGORY_STYLES = {
  hackathon: {
    accentColor: '#ff5722',
    badgeClass: 'text-orange-400 bg-orange-500/10',
    iconBg: 'bg-orange-500/10',
    gradientClass: 'from-[#1c1424] to-[#2d1f3d]',
  },
  techfest: {
    accentColor: '#a855f7',
    badgeClass: 'text-purple-400 bg-purple-500/10',
    iconBg: 'bg-purple-500/10',
    gradientClass: 'from-[#1a1428] to-[#2a1d40]',
  },
  'our-hackathon': {
    accentColor: '#10b981',
    badgeClass: 'text-emerald-400 bg-emerald-500/10',
    iconBg: 'bg-emerald-500/10',
    gradientClass: 'from-[#0d1f1a] to-[#122b22]',
  },
}