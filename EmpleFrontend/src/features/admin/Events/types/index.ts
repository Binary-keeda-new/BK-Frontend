export type EventType = 'hackathon' | 'techfest' | 'our-hackathon' | 'research-conference'

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
  eligibility: string
  rulesAndGuidelines: string
  teamSizeMin: number
  teamSizeMax: number
  problemStatement: string
  rewards: string
  solutionReveal: string
  solutionRevealLink: string
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
  eligibility: string
  rulesAndGuidelines: string
  teamSizeMin: number
  teamSizeMax: number
  problemStatement: string
  rewards: string
  solutionReveal: string
  solutionRevealLink: string
}

export interface Registration {
  _id: string
  event: string
  user: string
  name: string
  email: string
  phone: string
  createdAt: string
}

export interface Submission {
  _id: string
  event: string
  user: string
  name: string
  email: string
  githubLink: string
  videoLink: string
  createdAt: string
}