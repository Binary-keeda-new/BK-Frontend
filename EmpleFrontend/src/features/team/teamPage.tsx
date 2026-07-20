'use client'

import React, { useEffect, useState } from 'react'

type Member = {
  name: string
  role: string
  dept: string
  avatar: string
  bio: string
  skills: string[]
  joined: string
  linkedin: string
  github: string
}

type DepartmentTheme = {
  card: string
  cardHover: string
  avatarBorder: string
  avatarBackground: string
  roleText: string
  badge: string
  modalBorder: string
  modalShadow: string
  modalCover: string
  skill: string
}

const LEADERSHIP: Member[] = [
  {
    name: 'Aryan',
    role: 'Founder',
    dept: 'Leadership',
    avatar: '/team/aryansir.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://www.linkedin.com/in/aryan-gupta-8767a7161',
    github: 'aryan@binarykeeda.com',
  },
  {
    name: 'Mausam Chowksey',
    role: 'CEO',
    dept: 'Leadership',
    avatar: '/team/Mausam.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Kamakshi Rautela',
    role: 'CFO',
    dept: 'Leadership',
    avatar: '/team/kamakshi.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Dhinesh Ravi',
    role: 'CTO',
    dept: 'Leadership',
    avatar: '/team/dinesh.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
]

const MENTORSHIP: Member[] = [
  {
    name: 'Neelam Sharma',
    role: 'Counselling',
    dept: 'Mentorship',
    avatar: '/team/neelam.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Himanshu',
    role: 'Technical Mentor',
    dept: 'Mentorship',
    avatar: '/team/himanshu.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Dr. Suryakant',
    role: 'Marketing Head',
    dept: 'Mentorship',
    avatar: '/team/suryakant.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Aryan Bhandari',
    role: 'Ex-Development Lead',
    dept: 'Mentorship',
    avatar: '/team/aryanbhandari.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
]

const INTERNS: Member[] = [
  {
    name: 'Alisha',
    role: 'Application Developer',
    dept: 'Full Stack Developer',
    avatar: '/team/alsiha.jpeg',
    bio: 'Alisha is passionate about Computer Science and building modern web applications with React, Next.js, Node.js, and MongoDB. She enjoys turning ideas into complete products by working across frontend, backend, and database layers.',
    skills: [
      'React',
      'Next.js',
      'JavaScript',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Figma',
      'Python',
      'Docker',
      'Git',
      'GitHub',
    ],
    joined: 'June 2026',
    linkedin: 'https://www.linkedin.com/in/alisha-cs/',
    github: 'https://github.com/alishacreates',
  },
  {
    name: 'Palak Sharma',
    role: 'Application Developer',
    dept: 'Full Stack Developer',
    avatar: '/team/palak.jpeg',
    bio: 'Palak is a Full Stack Developer focused on creating efficient digital solutions, driven by a love for problem-solving and user-centric design.',
    skills: [
      'Figma',
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'MongoDB',
    ],
    joined: 'June 2026',
    linkedin: 'https://www.linkedin.com/in/palak-sharma-18667924b',
    github: 'https://github.com/Palak-Sharma05',
  },
  {
    name: 'Shreya Gangwar',
    role: 'Application Developer',
    dept: 'Mobile App Developer',
    avatar: '/team/shreya.jpeg',
    bio: 'Shreya is a Mobile App Developer, Full-Stack Web Developer, and Machine Learning enthusiast with a passion for building scalable applications and AI-powered solutions.',
    skills: [
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Firebase',
      'JavaScript',
      'Python',
      'Machine Learning',
      'AI',
      'REST APIs',
      'Git',
      'GitHub',
      'DSA',
      'OOP',
    ],
    joined: 'June 2026',
    linkedin: 'https://www.linkedin.com/in/shreya-gangwar-9b50a430b/',
    github: 'https://github.com/Shreya0705-ui',
  },
  {
    name: 'Lakshita Deopura',
    role: 'Application Developer',
    dept: 'Full Stack Developer',
    avatar: '/team/lakshita.jpeg',
    bio: 'Lakshita is a Full Stack Developer skilled in building responsive web applications and AI-driven solutions. She is passionate about creating impactful products through clean code, collaboration, and continuous learning.',
    skills: ['React.js', 'Node.js', 'Python', 'MongoDB', 'Generative AI'],
    joined: 'June 2026',
    linkedin: 'https://www.linkedin.com/in/lakshita-deopura',
    github: 'https://github.com/Lakshita-1408',
  },
  {
    name: 'Anika Sen',
    role: 'Social Media Lead',
    dept: 'Full Stack Developer',
    avatar: '/team/anika.jpeg',
    bio: 'Anika is a full-stack developer passionate about building web applications and solving real-world problems through technology.',
    skills: [
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'HTML',
      'CSS',
      'Java',
      'Python',
      'Figma',
    ],
    joined: 'June 2026',
    linkedin:
      'https://www.linkedin.com/in/anika-sen-?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    github: 'https://github.com/anikasen1006',
  },
  {
    name: 'Srishti Pundeer',
    role: 'QA',
    dept: 'Full Stack Developer',
    avatar: '/team/srishti.jpeg',
    bio: 'Srishti is a Computer Science and Engineering student passionate about technology, innovation, and continuous learning. Her interests include software development, artificial intelligence, data science, and algorithmic problem-solving.',
    skills: [
      'REST APIs',
      'React',
      'Next.js',
      'Express.js',
      'Node.js',
      'SQL',
      'Git',
      'GitHub',
      'DSA',
      'MongoDB',
    ],
    joined: 'June 2026',
    linkedin: 'https://www.linkedin.com/in/srishti-pundeer/',
    github: 'https://github.com/srishtipundeer1116',
  },
  {
    name: 'Vridhi Jain',
    role: 'Application Developer',
    dept: 'Full Stack Developer',
    avatar: '/team/vridhi.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://www.linkedin.com/in/vridhijain29',
    github: 'https://github.com/Vridhi29',
  },
  {
    name: 'Bhavya Agarwal',
    role: 'Application Developer',
    dept: 'Full Stack Developer',
    avatar: 'BA',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Kunal Bubna',
    role: 'Application Developer',
    dept: 'Full Stack Developer',
    avatar: '/team/kunal.jpeg',
    bio: 'Kunal Bubna is a Full Stack Developer with a strong interest in creating innovative and user-centric digital solutions. He enjoys solving complex problems and building reliable applications across the frontend and backend.',
    skills: [
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'MongoDB',
    ],
    joined: 'June 2026',
    linkedin:
      'https://www.linkedin.com/in/kunal-bubna-873036374?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    github: '',
  },
  {
    name: 'Bhoomi Tomer',
    role: 'Application Developer',
    dept: 'Full Stack Developer',
    avatar: '/team/bhoomi.jpeg',
    bio: 'Bhoomi is a Cyber Security enthusiast and Full Stack Developer passionate about building secure, user-friendly web applications and solving real-world problems through technology.',
    skills: [
      'React.js',
      'Node.js',
      'JavaScript',
      'Python',
      'Cyber Security',
      'Network Security',
      'Vulnerability Assessment',
      'Security Analysis',
      'Git',
      'GitHub',
      'DSA',
    ],
    joined: 'June 2026',
    linkedin:
      'https://www.linkedin.com/in/tomerbhoomi?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    github: 'https://github.com/bhoomig9891-hash',
  },
  {
    name: 'Amishi',
    role: 'ML Developer',
    dept: 'Machine Learning',
    avatar: 'A',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Hardik Bindal',
    role: 'Emple Kids Lead',
    dept: 'Full Stack Developer',
    avatar: '/team/hardik.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Akshat Sharma',
    role: 'Content Writer',
    dept: 'Content Writer',
    avatar: '/team/akshat.jpeg',
    bio: 'Akshat is a Cybersecurity enthusiast and Computer Science student with a strong interest in ethical hacking, network security, and digital forensics.',
    skills: [
      'Java',
      'DSA',
      'Python',
      'Research and Analysis',
      'Content Writing',
    ],
    joined: 'June 2026',
    linkedin: 'https://www.linkedin.com/in/akshat-sharma2087',
    github: 'https://github.com/akshat8710',
  },
  {
    name: 'Akriti Joshi',
    role: 'Content Writer',
    dept: 'Content Writer',
    avatar: '/team/akriti.jpeg',
    bio: 'Akriti is a passionate student with a strong interest in coding, problem solving, research, and cybersecurity. She enjoys building practical solutions through programming and exploring emerging technologies.',
    skills: ['Python', 'Java', 'DSA', 'OOP', 'Content Writing'],
    joined: 'June 2026',
    linkedin: 'https://www.linkedin.com/in/aakriti-joshi-049893363',
    github: 'https://github.com/Aakriti1-joshi',
  },
  {
    name: 'Manan Rajoria',
    role: 'Content Writer',
    dept: 'Content Writer',
    avatar: 'MR',
    bio: 'Manan is a technology enthusiast with a strong interest in software development, problem-solving, and emerging technologies.',
    skills: ['Java', 'Python', 'Content Writing', 'Research & Analysis'],
    joined: 'June 2026',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Vanshika Rawat',
    role: 'Cyber Security Analyst',
    dept: 'Cyber Security',
    avatar: '/team/vanshika.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://www.linkedin.com/in/oneshika/',
    github: 'https://github.com/1shieka',
  },
  {
    name: 'Rahul Chaturvedi',
    role: 'Cyber Security Analyst',
    dept: 'Cyber Security',
    avatar: 'RC',
    bio: 'Rahul is a Cyber Security enthusiast focused on securing digital infrastructure and supporting safe technology environments.',
    skills: [
      'Cyber Security',
      'Penetration Testing',
      'Information Security',
      'Security Analysis',
      'Threat Assessment',
      'Risk Management',
    ],
    joined: 'June 2026',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Manya Goel',
    role: 'ML Developer',
    dept: 'Machine Learning',
    avatar: '/team/manya.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://www.linkedin.com/in/manya-goel',
    github: 'https://github.com/Manya-Goel',
  },
  {
    name: 'Tanish Chopra',
    role: 'Cyber Security Analyst',
    dept: 'Cyber Security',
    avatar: '/team/tanish.jpeg',
    bio: 'Tanish is a Cyber Security enthusiast with a keen interest in system and network security, risk identification, and strengthening digital environments.',
    skills: [
      'Cyber Security',
      'Vulnerability Assessment',
      'Penetration Testing',
      'Web Application Security',
      'Network Security',
      'Risk Assessment',
      'Security Analysis',
    ],
    joined: 'June 2026',
    linkedin: 'https://www.linkedin.com/in/tanish-chopra15',
    github: 'https://github.com/tanishchopra15',
  },
  {
    name: 'Garima',
    role: 'ML Developer',
    dept: 'Mobile App Developer',
    avatar: '/team/garima.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin:
      'https://www.linkedin.com/in/garima-goyal-68869631b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    github: 'https://github.com/new',
  },
  {
    name: 'Aditya Agarwal',
    role: 'ML Developer',
    dept: 'Full Stack Developer',
    avatar: '/team/aditya.jpeg',
    bio: 'Aditya is an enthusiastic learner with an interest in technology and problem-solving. He enjoys building projects and continuously improving his skills.',
    skills: ['Python', 'Java', 'Research and Analysis'],
    joined: 'June 2026',
    linkedin: 'https://www.linkedin.com/in/aditya-agarwal-5b617b339',
    github: 'https://github.com/Adityaagarwal2005',
  },
  {
    name: 'Shivanya',
    role: 'DevOps',
    dept: 'DevOps',
    avatar: 'S',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Tanya Marwaha',
    role: 'Innovation Management',
    dept: 'Mobile Development',
    avatar: '/team/tanya.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://www.linkedin.com/in/tanya-marwaha-abb690330/',
    github: 'https://github.com/Tanya-1806',
  },
  {
    name: 'Meghna Dhakad',
    role: 'Innovation Management',
    dept: 'Mobile Development',
    avatar: '/team/meghna.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin:
      'https://www.linkedin.com/in/meghna-dhakad?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    github: 'https://github.com/MeghnaDhakad',
  },
  {
    name: 'Vaanya Sehrawat',
    role: 'Innovation Management',
    dept: 'Social Media',
    avatar: '/team/vaanya.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: 'https://www.linkedin.com/in/vaanya-sehrawat',
    github: 'https://github.com/VaanyaSehrawat',
  },
  {
    name: 'Rishika',
    role: 'Social Media',
    dept: 'Social Media',
    avatar: 'R',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin: '',
    github: '',
  },
  {
    name: 'Kashish Bhatt',
    role: 'Social Media',
    dept: 'Social Media',
    avatar: '/team/kashish.jpeg',
    bio: '',
    skills: [],
    joined: 'June 2026',
    linkedin:
      'https://www.linkedin.com/in/kashish-bhatt-418a98341?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    github: 'https://github.com/Kashish-Bhatt',
  },
]

const DEFAULT_THEME: DepartmentTheme = {
  card:
    'border-cyan-400/25 bg-gradient-to-br from-[#001218] to-[#111111]',
  cardHover:
    'hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(53,187,255,0.2)]',
  avatarBorder: 'border-cyan-400',
  avatarBackground: 'bg-gradient-to-br from-cyan-400 to-cyan-400/50',
  roleText: 'text-cyan-300',
  badge: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-300',
  modalBorder: 'border-cyan-400/50',
  modalShadow: 'shadow-[0_0_60px_rgba(53,187,255,0.2)]',
  modalCover: 'bg-gradient-to-br from-[#001218] to-[#0d0d0d]',
  skill: 'border-cyan-400/20 text-cyan-300',
}

const DEPARTMENT_THEMES: Record<string, DepartmentTheme> = {
  Leadership: {
    card:
      'border-orange-500/25 bg-gradient-to-br from-[#1a0d00] to-[#111111]',
    cardHover:
      'hover:border-orange-500/60 hover:shadow-[0_0_20px_rgba(255,107,53,0.2)]',
    avatarBorder: 'border-orange-500',
    avatarBackground:
      'bg-gradient-to-br from-orange-500 to-orange-500/50',
    roleText: 'text-orange-400',
    badge: 'border-orange-500/25 bg-orange-500/10 text-orange-400',
    modalBorder: 'border-orange-500/50',
    modalShadow: 'shadow-[0_0_60px_rgba(255,107,53,0.2)]',
    modalCover: 'bg-gradient-to-br from-[#1a0d00] to-[#0d0d0d]',
    skill: 'border-orange-500/20 text-orange-400',
  },
  Mentorship: {
    card:
      'border-purple-500/25 bg-gradient-to-br from-[#0d001a] to-[#111111]',
    cardHover:
      'hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]',
    avatarBorder: 'border-purple-500',
    avatarBackground:
      'bg-gradient-to-br from-purple-500 to-purple-500/50',
    roleText: 'text-purple-300',
    badge: 'border-purple-500/25 bg-purple-500/10 text-purple-300',
    modalBorder: 'border-purple-500/50',
    modalShadow: 'shadow-[0_0_60px_rgba(168,85,247,0.2)]',
    modalCover: 'bg-gradient-to-br from-[#0d001a] to-[#0d0d0d]',
    skill: 'border-purple-500/20 text-purple-300',
  },
  'Cyber Security': {
    card:
      'border-rose-500/25 bg-gradient-to-br from-[#120010] to-[#111111]',
    cardHover:
      'hover:border-rose-500/60 hover:shadow-[0_0_20px_rgba(255,68,102,0.2)]',
    avatarBorder: 'border-rose-500',
    avatarBackground: 'bg-gradient-to-br from-rose-500 to-rose-500/50',
    roleText: 'text-rose-400',
    badge: 'border-rose-500/25 bg-rose-500/10 text-rose-400',
    modalBorder: 'border-rose-500/50',
    modalShadow: 'shadow-[0_0_60px_rgba(255,68,102,0.2)]',
    modalCover: 'bg-gradient-to-br from-[#120010] to-[#0d0d0d]',
    skill: 'border-rose-500/20 text-rose-400',
  },
  'Full Stack Developer': DEFAULT_THEME,
  'Mobile App Developer': {
    card:
      'border-amber-500/25 bg-gradient-to-br from-[#1a1200] to-[#111111]',
    cardHover:
      'hover:border-amber-500/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]',
    avatarBorder: 'border-amber-500',
    avatarBackground:
      'bg-gradient-to-br from-amber-500 to-amber-500/50',
    roleText: 'text-amber-400',
    badge: 'border-amber-500/25 bg-amber-500/10 text-amber-400',
    modalBorder: 'border-amber-500/50',
    modalShadow: 'shadow-[0_0_60px_rgba(245,158,11,0.2)]',
    modalCover: 'bg-gradient-to-br from-[#1a1200] to-[#0d0d0d]',
    skill: 'border-amber-500/20 text-amber-400',
  },
  'Mobile Development': {
    card:
      'border-amber-500/25 bg-gradient-to-br from-[#1a1200] to-[#111111]',
    cardHover:
      'hover:border-amber-500/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]',
    avatarBorder: 'border-amber-500',
    avatarBackground:
      'bg-gradient-to-br from-amber-500 to-amber-500/50',
    roleText: 'text-amber-400',
    badge: 'border-amber-500/25 bg-amber-500/10 text-amber-400',
    modalBorder: 'border-amber-500/50',
    modalShadow: 'shadow-[0_0_60px_rgba(245,158,11,0.2)]',
    modalCover: 'bg-gradient-to-br from-[#1a1200] to-[#0d0d0d]',
    skill: 'border-amber-500/20 text-amber-400',
  },
  'Content Writer': {
    card:
      'border-emerald-500/25 bg-gradient-to-br from-[#001208] to-[#111111]',
    cardHover:
      'hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(53,255,140,0.2)]',
    avatarBorder: 'border-emerald-500',
    avatarBackground:
      'bg-gradient-to-br from-emerald-500 to-emerald-500/50',
    roleText: 'text-emerald-400',
    badge: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-400',
    modalBorder: 'border-emerald-500/50',
    modalShadow: 'shadow-[0_0_60px_rgba(53,255,140,0.2)]',
    modalCover: 'bg-gradient-to-br from-[#001208] to-[#0d0d0d]',
    skill: 'border-emerald-500/20 text-emerald-400',
  },
  'Social Media': {
    card:
      'border-pink-500/25 bg-gradient-to-br from-[#18000f] to-[#111111]',
    cardHover:
      'hover:border-pink-500/60 hover:shadow-[0_0_20px_rgba(236,72,153,0.2)]',
    avatarBorder: 'border-pink-500',
    avatarBackground: 'bg-gradient-to-br from-pink-500 to-pink-500/50',
    roleText: 'text-pink-400',
    badge: 'border-pink-500/25 bg-pink-500/10 text-pink-400',
    modalBorder: 'border-pink-500/50',
    modalShadow: 'shadow-[0_0_60px_rgba(236,72,153,0.2)]',
    modalCover: 'bg-gradient-to-br from-[#18000f] to-[#0d0d0d]',
    skill: 'border-pink-500/20 text-pink-400',
  },
  'Machine Learning': {
    card:
      'border-violet-500/25 bg-gradient-to-br from-[#10001a] to-[#111111]',
    cardHover:
      'hover:border-violet-500/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]',
    avatarBorder: 'border-violet-500',
    avatarBackground:
      'bg-gradient-to-br from-violet-500 to-violet-500/50',
    roleText: 'text-violet-400',
    badge: 'border-violet-500/25 bg-violet-500/10 text-violet-400',
    modalBorder: 'border-violet-500/50',
    modalShadow: 'shadow-[0_0_60px_rgba(139,92,246,0.2)]',
    modalCover: 'bg-gradient-to-br from-[#10001a] to-[#0d0d0d]',
    skill: 'border-violet-500/20 text-violet-400',
  },
  DevOps: {
    card:
      'border-sky-500/25 bg-gradient-to-br from-[#00111a] to-[#111111]',
    cardHover:
      'hover:border-sky-500/60 hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]',
    avatarBorder: 'border-sky-500',
    avatarBackground: 'bg-gradient-to-br from-sky-500 to-sky-500/50',
    roleText: 'text-sky-400',
    badge: 'border-sky-500/25 bg-sky-500/10 text-sky-400',
    modalBorder: 'border-sky-500/50',
    modalShadow: 'shadow-[0_0_60px_rgba(14,165,233,0.2)]',
    modalCover: 'bg-gradient-to-br from-[#00111a] to-[#0d0d0d]',
    skill: 'border-sky-500/20 text-sky-400',
  },
}

const SECTION_THEMES = {
  leadership: {
    line: 'from-transparent via-orange-500/25 to-transparent',
    pill: 'border-orange-500/25 bg-orange-500/10 text-orange-500',
  },
  mentorship: {
    line: 'from-transparent via-purple-500/25 to-transparent',
    pill: 'border-purple-500/25 bg-purple-500/10 text-purple-400',
  },
  interns: {
    line: 'from-transparent via-cyan-400/25 to-transparent',
    pill: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-400',
  },
}

function getTheme(department: string) {
  return DEPARTMENT_THEMES[department] ?? DEFAULT_THEME
}

function isValidExternalLink(value: string) {
  return value.startsWith('http://') || value.startsWith('https://')
}

function LinkedInIcon({
  className = 'h-3.5 w-3.5',
}: {
  className?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon({
  className = 'h-3.5 w-3.5',
}: {
  className?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function Avatar({
  member,
  size = 'small',
}: {
  member: Member
  size?: 'small' | 'large'
}) {
  const theme = getTheme(member.dept)

  const sizeClass =
    size === 'large' ? 'h-24 w-24 text-3xl' : 'h-16 w-16 text-xl'

  return (
    <div
      className={`shrink-0 overflow-hidden rounded-full border-2 ${sizeClass} ${theme.avatarBorder}`}
    >
      {member.avatar.startsWith('/') ? (
        <img
          src={member.avatar}
          alt={member.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center font-black text-white ${theme.avatarBackground}`}
        >
          {member.avatar}
        </div>
      )}
    </div>
  )
}

function SocialIconLink({
  href,
  title,
  children,
  className,
}: {
  href: string
  title: string
  children: React.ReactNode
  className: string
}) {
  if (!isValidExternalLink(href)) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => event.stopPropagation()}
      title={title}
      aria-label={title}
      className={`flex h-7 w-7 items-center justify-center rounded-lg border transition duration-150 hover:scale-110 ${className}`}
    >
      {children}
    </a>
  )
}

function MemberCard({
  member,
  onClick,
  showSocial = true,
}: {
  member: Member
  onClick: () => void
  showSocial?: boolean
}) {
  const theme = getTheme(member.dept)

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick()
        }
      }}
      className={`flex h-full w-full cursor-pointer flex-col items-center gap-3 rounded-2xl border p-5 transition duration-200 hover:scale-[1.03] active:scale-[0.98] ${theme.card} ${theme.cardHover}`}
    >
      <Avatar member={member} />

      <div className="text-center">
        <p className="text-sm font-bold leading-tight text-white">
          {member.name}
        </p>

        <p className={`mt-1 text-xs ${theme.roleText}`}>
          {member.role}
        </p>
      </div>

      {member.dept && (
        <span
          className={`rounded-full border px-2.5 py-0.5 text-center text-[10px] font-semibold ${theme.badge}`}
        >
          {member.dept}
        </span>
      )}

      {showSocial && (
        <div className="mt-auto flex gap-2 pt-1">
          <SocialIconLink
            href={member.linkedin}
            title={`${member.name} on LinkedIn`}
            className={theme.badge}
          >
            <LinkedInIcon />
          </SocialIconLink>

          <SocialIconLink
            href={member.github}
            title={`${member.name} on GitHub`}
            className={theme.badge}
          >
            <GitHubIcon />
          </SocialIconLink>
        </div>
      )}
    </article>
  )
}

function SectionLabel({
  label,
  theme,
}: {
  label: string
  theme: keyof typeof SECTION_THEMES
}) {
  const colors = SECTION_THEMES[theme]

  return (
    <div className="mb-5 flex items-center gap-4">
      <div
        className={`h-px flex-1 bg-gradient-to-r ${colors.line}`}
      />

      <span
        className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${colors.pill}`}
      >
        {label}
      </span>

      <div
        className={`h-px flex-1 bg-gradient-to-l ${colors.line}`}
      />
    </div>
  )
}

function DetailLink({
  href,
  type,
}: {
  href: string
  type: 'linkedin' | 'github'
}) {
  if (!isValidExternalLink(href)) return null

  const isLinkedIn = type === 'linkedin'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        isLinkedIn
          ? 'flex items-center gap-1.5 rounded-full border border-[#0A66C2]/25 bg-[#0A66C2]/10 px-3 py-1 text-[11px] font-semibold text-[#0A66C2] transition hover:scale-105'
          : 'flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1 text-[11px] font-semibold text-zinc-300 transition hover:scale-105'
      }
    >
      {isLinkedIn ? <LinkedInIcon /> : <GitHubIcon />}
      {isLinkedIn ? 'LinkedIn' : 'GitHub'}
    </a>
  )
}

function Modal({
  member,
  onClose,
}: {
  member: Member
  onClose: () => void
}) {
  const theme = getTheme(member.dept)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const visibleSkills = member.skills.filter((skill) => skill.trim())

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${member.name} profile`}
        onClick={(event) => event.stopPropagation()}
        className={`relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border bg-[#111111] ${theme.modalBorder} ${theme.modalShadow}`}
      >
        <div
          className={`relative flex h-36 w-full items-end border-b border-white/5 px-6 ${theme.modalCover}`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div
            className={`relative z-10 translate-y-12 rounded-full border-[3px] outline outline-4 outline-[#111111] ${theme.avatarBorder}`}
          >
            <Avatar member={member} size="large" />
          </div>

          {member.name === 'Aryan' &&
            member.dept === 'Leadership' && (
              <div className="absolute bottom-3 right-6 flex items-center gap-2">
                <DetailLink
                  href={member.linkedin}
                  type="linkedin"
                />

                {member.github && (
                  <a
                    href={`mailto:${member.github}`}
                    className="flex items-center gap-1.5 rounded-full border border-[#EA4335]/25 bg-[#EA4335]/10 px-3 py-1 text-[11px] font-semibold text-[#EA4335]"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.64l8.073-6.147C21.69 2.28 24 3.434 24 5.457z" />
                    </svg>

                    Email
                  </a>
                )}
              </div>
            )}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute right-4 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full text-2xl leading-none text-zinc-500 transition hover:bg-white/10 hover:text-white"
        >
          ×
        </button>

        <div className="px-6 pb-6 pt-16">
          <div className="mb-4">
            <h2 className="text-xl font-black text-white">
              {member.name}
            </h2>

            <p className={`mt-0.5 text-sm ${theme.roleText}`}>
              {member.role}
            </p>

            {member.dept && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${theme.badge}`}
                >
                  {member.dept}
                </span>
              </div>
            )}
          </div>

          {member.dept !== 'Leadership' &&
            member.dept !== 'Mentorship' && (
              <>
                {member.bio && (
                  <p className="mb-5 text-sm leading-relaxed text-zinc-400">
                    {member.bio.trim()}
                  </p>
                )}

                <div className="mb-5 flex flex-wrap items-center gap-2">
                  {member.joined && (
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${theme.badge}`}
                    >
                      Joined {member.joined}
                    </span>
                  )}

                  <DetailLink
                    href={member.linkedin}
                    type="linkedin"
                  />

                  <DetailLink
                    href={member.github}
                    type="github"
                  />
                </div>

                {visibleSkills.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                      Skills
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {visibleSkills.map((skill) => (
                        <span
                          key={`${member.name}-${skill}`}
                          className={`rounded-full border bg-[#1a1a1a] px-3 py-1 text-xs ${theme.skill}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
        </div>
      </div>
    </div>
  )
}

function CardGrid({
  members,
  onSelect,
  showSocial = true,
}: {
  members: Member[]
  onSelect: (member: Member) => void
  showSocial?: boolean
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member) => (
        <MemberCard
          key={`${member.name}-${member.role}`}
          member={member}
          onClick={() => onSelect(member)}
          showSocial={showSocial}
        />
      ))}
    </div>
  )
}

export default function TeamPage() {
  const [selected, setSelected] = useState<Member | null>(null)

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0d0d0d]">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,107,53,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,53,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="pointer-events-none fixed left-1/2 top-0 h-[400px] w-[600px] max-w-full -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(255,107,53,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-14">
        <header className="mb-12 text-center">
          <span className="mb-5 inline-block rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-500">
            ● Our Team
          </span>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            People behind{' '}
            <span className="text-orange-500">Emple</span>
          </h1>

          <p className="mt-3 text-sm text-zinc-500">
            Click any card to learn more about the team.
          </p>
        </header>

        <section>
          <SectionLabel
            label="Leadership Team"
            theme="leadership"
          />

          <CardGrid
            members={LEADERSHIP}
            onSelect={setSelected}
            showSocial={false}
          />
        </section>

        <section className="mt-10">
          <SectionLabel
            label="Mentorship Team"
            theme="mentorship"
          />

          <CardGrid
            members={MENTORSHIP}
            onSelect={setSelected}
            showSocial={false}
          />
        </section>

        <section className="mt-10">
          <SectionLabel
            label="Interns & Spines"
            theme="interns"
          />

          <CardGrid
            members={INTERNS}
            onSelect={setSelected}
          />
        </section>

        <footer className="mt-12 text-center text-xs text-zinc-700">
          © 2026 Emple · AI-Powered Placement Ecosystem
        </footer>
      </div>

      {selected && (
        <Modal
          member={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </main>
  )
}