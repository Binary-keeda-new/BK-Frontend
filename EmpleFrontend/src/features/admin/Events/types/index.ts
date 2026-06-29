export type EventType = 'hackathon' | 'techfest' | 'our-hackathon'

export interface EventLink {
  label: string
  url: string
}

export interface Event {
  _id: string
  title: string
  description: string
  type: EventType
  date: string
  startDate: string
  endDate: string
  registrationLink: string
  registrationOpen: boolean
  organiser: string
  banner: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  // our-hackathon only
  solutionLink: string
  links: EventLink[]
  rewards: string
}

export interface EventFormData {
  title: string
  description: string
  type: EventType
  date: string
  startDate: string
  endDate: string
  registrationLink: string
  registrationOpen: boolean
  organiser: string
  banner: string
  // our-hackathon only
  solutionLink: string
  links: EventLink[]
  rewards: string
}