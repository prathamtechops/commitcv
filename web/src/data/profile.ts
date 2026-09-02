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
    colorClass: 'bg-language-typescript',
    stars: 842,
    forks: 54,
  },
  {
    name: 'kinetic-ui',
    description: 'Accessible React primitives with thoughtful motion built in.',
    language: 'React',
    colorClass: 'bg-language-react',
    stars: 516,
    forks: 31,
  },
  {
    name: 'tiny-colors',
    description: 'Fast colour utilities for designers who happen to code.',
    language: 'Rust',
    colorClass: 'bg-language-rust',
    stars: 278,
    forks: 18,
  },
]

export const languages = [
  {
    name: 'TypeScript',
    percentage: 48,
    colorClass: 'bg-language-typescript',
    widthClass: 'w-[48%]',
  },
  {
    name: 'React',
    percentage: 27,
    colorClass: 'bg-language-react',
    widthClass: 'w-[27%]',
  },
  {
    name: 'Rust',
    percentage: 15,
    colorClass: 'bg-language-rust',
    widthClass: 'w-[15%]',
  },
  {
    name: 'Other',
    percentage: 10,
    colorClass: 'bg-language-other',
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
    swatchClass: 'bg-accent-tangerine',
    textClass: 'text-accent-tangerine-text',
    backgroundClass: 'bg-accent-tangerine',
    softClass: 'bg-accent-tangerine-soft',
    borderClass: 'border-accent-tangerine/25',
    gradientClass: 'from-accent-tangerine',
    activityClasses: [
      'bg-accent-tangerine/10',
      'bg-accent-tangerine/30',
      'bg-accent-tangerine/60',
      'bg-accent-tangerine',
    ],
  },
  {
    name: 'Cobalt',
    swatchClass: 'bg-accent-cobalt',
    textClass: 'text-accent-cobalt',
    backgroundClass: 'bg-accent-cobalt',
    softClass: 'bg-accent-cobalt-soft',
    borderClass: 'border-accent-cobalt/25',
    gradientClass: 'from-accent-cobalt',
    activityClasses: [
      'bg-accent-cobalt/10',
      'bg-accent-cobalt/30',
      'bg-accent-cobalt/60',
      'bg-accent-cobalt',
    ],
  },
  {
    name: 'Jade',
    swatchClass: 'bg-accent-jade',
    textClass: 'text-accent-jade',
    backgroundClass: 'bg-accent-jade',
    softClass: 'bg-accent-jade-soft',
    borderClass: 'border-accent-jade/25',
    gradientClass: 'from-accent-jade',
    activityClasses: [
      'bg-accent-jade/10',
      'bg-accent-jade/30',
      'bg-accent-jade/60',
      'bg-accent-jade',
    ],
  },
  {
    name: 'Plum',
    swatchClass: 'bg-accent-plum',
    textClass: 'text-accent-plum',
    backgroundClass: 'bg-accent-plum',
    softClass: 'bg-accent-plum-soft',
    borderClass: 'border-accent-plum/25',
    gradientClass: 'from-accent-plum',
    activityClasses: [
      'bg-accent-plum/10',
      'bg-accent-plum/30',
      'bg-accent-plum/60',
      'bg-accent-plum',
    ],
  },
]
