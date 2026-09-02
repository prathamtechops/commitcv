export type ComponentId =
  | 'about'
  | 'stats'
  | 'languages'
  | 'repositories'
  | 'contributions'
  | 'socials'

export type TemplateId = 'minimal' | 'modern' | 'developer'

export const profile = {
  name: 'Maya Chen',
  username: 'mayacodes',
  initials: 'MC',
  role: 'Frontend engineer & open-source maker',
  bio: 'I turn complicated developer workflows into calm, useful interfaces. Currently exploring local-first tools and delightful data visualisation.',
  location: 'Singapore',
  followers: 1248,
  repositories: 42,
  following: 186,
}

export const repositories = [
  {
    name: 'orbit-notes',
    description: 'A tiny local-first workspace for ideas that need room to grow.',
    language: 'TypeScript',
    colorClass: 'bg-[#3178c6]',
    stars: 842,
    forks: 54,
  },
  {
    name: 'kinetic-ui',
    description: 'Accessible React primitives with thoughtful motion built in.',
    language: 'React',
    colorClass: 'bg-[#61dafb]',
    stars: 516,
    forks: 31,
  },
  {
    name: 'tiny-colors',
    description: 'Fast colour utilities for designers who happen to code.',
    language: 'Rust',
    colorClass: 'bg-[#dea584]',
    stars: 278,
    forks: 18,
  },
]

export const languages = [
  {
    name: 'TypeScript',
    percentage: 48,
    colorClass: 'bg-[#3178c6]',
    widthClass: 'w-[48%]',
  },
  {
    name: 'React',
    percentage: 27,
    colorClass: 'bg-[#61dafb]',
    widthClass: 'w-[27%]',
  },
  {
    name: 'Rust',
    percentage: 15,
    colorClass: 'bg-[#dea584]',
    widthClass: 'w-[15%]',
  },
  {
    name: 'Other',
    percentage: 10,
    colorClass: 'bg-[#a3a3a3]',
    widthClass: 'w-[10%]',
  },
]

export const socialLinks = [
  { label: 'mayacodes.dev', value: 'Portfolio' },
  { label: '@maya_codes', value: 'LinkedIn' },
  { label: 'hello@mayacodes.dev', value: 'Email' },
]

export const contributions = Array.from({ length: 84 }, (_, index) => {
  const pattern = (index * 7 + Math.floor(index / 6) * 3) % 13
  if (pattern < 5) return 0
  if (pattern < 8) return 1
  if (pattern < 11) return 2
  return 3
})

export const componentLabels: Record<ComponentId, string> = {
  about: 'About me',
  stats: 'GitHub stats',
  languages: 'Main languages',
  repositories: 'Top repositories',
  contributions: 'Contribution graph',
  socials: 'Social links',
}

export const templateOptions: Array<{
  id: TemplateId
  name: string
  description: string
}> = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Quiet, editorial, and focused on your work.',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Warm colour, soft depth, and a friendly profile.',
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Dark, technical, and made for code-first profiles.',
  },
]

export const themeOptions = [
  {
    name: 'Tangerine',
    swatchClass: 'bg-[#f26b38]',
    textClass: 'text-[#d95728]',
    backgroundClass: 'bg-[#f26b38]',
    softClass: 'bg-[#fff0e7]',
    borderClass: 'border-[#f26b38]/25',
    gradientClass: 'from-[#f26b38]',
    activityClasses: [
      'bg-[#f26b38]/10',
      'bg-[#f26b38]/30',
      'bg-[#f26b38]/60',
      'bg-[#f26b38]',
    ],
  },
  {
    name: 'Cobalt',
    swatchClass: 'bg-[#315bd8]',
    textClass: 'text-[#315bd8]',
    backgroundClass: 'bg-[#315bd8]',
    softClass: 'bg-[#eaf0ff]',
    borderClass: 'border-[#315bd8]/25',
    gradientClass: 'from-[#315bd8]',
    activityClasses: [
      'bg-[#315bd8]/10',
      'bg-[#315bd8]/30',
      'bg-[#315bd8]/60',
      'bg-[#315bd8]',
    ],
  },
  {
    name: 'Jade',
    swatchClass: 'bg-[#168a69]',
    textClass: 'text-[#168a69]',
    backgroundClass: 'bg-[#168a69]',
    softClass: 'bg-[#e4f6ef]',
    borderClass: 'border-[#168a69]/25',
    gradientClass: 'from-[#168a69]',
    activityClasses: [
      'bg-[#168a69]/10',
      'bg-[#168a69]/30',
      'bg-[#168a69]/60',
      'bg-[#168a69]',
    ],
  },
  {
    name: 'Plum',
    swatchClass: 'bg-[#8c4ec7]',
    textClass: 'text-[#8c4ec7]',
    backgroundClass: 'bg-[#8c4ec7]',
    softClass: 'bg-[#f4eafa]',
    borderClass: 'border-[#8c4ec7]/25',
    gradientClass: 'from-[#8c4ec7]',
    activityClasses: [
      'bg-[#8c4ec7]/10',
      'bg-[#8c4ec7]/30',
      'bg-[#8c4ec7]/60',
      'bg-[#8c4ec7]',
    ],
  },
]
