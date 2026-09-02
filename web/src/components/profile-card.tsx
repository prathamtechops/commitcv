import type { ReactNode } from 'react'
import {
  ArrowUpRight,
  Building2,
  GitBranch,
  GitFork,
  Globe2,
  Mail,
  MapPin,
  Star,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  componentLabels,
  contributions,
  languages,
  profile,
  repositories,
  socialLinks,
  themeOptions,
  type ComponentId,
  type TemplateId,
} from '@/data/profile'
import { cn } from '@/lib/utils'

type ProfileCardProps = {
  compact: boolean
  enabled: Record<ComponentId, boolean>
  order: ComponentId[]
  template: TemplateId
  themeIndex: number
}

type ProfileSectionProps = {
  children: ReactNode
  developer: boolean
  id: ComponentId
}

type Repository = (typeof repositories)[number]
type Theme = (typeof themeOptions)[number]

function ProfileSection({
  children,
  developer,
  id,
}: ProfileSectionProps) {
  return (
    <section>
      <div
        className={cn(
          'mb-3 flex items-center gap-2.5 text-[9px] font-bold tracking-[0.13em] uppercase',
          developer ? 'text-developer-muted' : 'text-profile-muted',
        )}
      >
        <span>{componentLabels[id]}</span>
        <Separator
          className={cn(
            'flex-1',
            developer ? 'bg-developer-border' : 'bg-profile-border',
          )}
        />
      </div>
      {children}
    </section>
  )
}

function RepositoryCard({
  compact,
  developer,
  repository,
}: {
  compact: boolean
  developer: boolean
  repository: Repository
}) {
  return (
    <Card
      className={cn(
        'gap-0 rounded-xl border p-3.5 shadow-none ring-0',
        developer
          ? 'border-developer-border bg-developer-panel text-inherit'
          : 'border-profile-border bg-profile-panel',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between',
          developer ? 'text-developer-muted' : 'text-profile-muted',
        )}
      >
        <GitBranch aria-hidden="true" className="size-3.5" />
        <ArrowUpRight aria-hidden="true" className="size-3.5" />
      </div>
      <h4 className="mt-3 mb-1.5 overflow-hidden font-mono text-[11px] font-bold text-ellipsis whitespace-nowrap">
        {repository.name}
      </h4>
      <p
        className={cn(
          'overflow-hidden text-[9px] leading-relaxed',
          !compact && 'min-h-9 max-[600px]:min-h-0',
          developer ? 'text-developer-muted' : 'text-profile-muted',
        )}
      >
        {repository.description}
      </p>
      <div
        className={cn(
          'mt-3 flex items-center gap-2.5 text-[8px]',
          developer ? 'text-developer-muted' : 'text-profile-muted',
        )}
      >
        <span className="inline-flex items-center gap-1">
          <i className={cn('size-1.5 rounded-full', repository.colorClass)} />
          {repository.language}
        </span>
        <span className="inline-flex items-center gap-1">
          <Star aria-hidden="true" className="size-2.5" /> {repository.stars}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork aria-hidden="true" className="size-2.5" /> {repository.forks}
        </span>
      </div>
    </Card>
  )
}

function ProfileHeader({
  compact,
  developer,
  minimal,
  theme,
}: {
  compact: boolean
  developer: boolean
  minimal: boolean
  theme: Theme
}) {
  return (
    <header
      className={cn(
        'relative grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b px-8 py-7 max-[600px]:grid-cols-[auto_1fr] max-[600px]:px-5 max-[600px]:py-5',
        compact && 'grid-cols-[auto_1fr] px-5 py-5',
        developer ? 'border-developer-border' : 'border-profile-border',
      )}
    >
      <div
        aria-label={profile.name + ' avatar placeholder'}
        className={cn(
          'relative grid size-[76px] place-items-center rounded-3xl border-[5px] border-white bg-linear-to-br to-brand-ink text-white shadow-profile-avatar max-[600px]:size-[62px] max-[600px]:rounded-2xl',
          theme.gradientClass,
          minimal && 'rounded-full',
          developer && 'border-developer-canvas to-developer-highlight',
          compact && 'size-[62px] rounded-2xl',
        )}
      >
        <span className="text-[23px] font-bold tracking-[-0.06em]">
          {profile.initials}
        </span>
        <i
          className={cn(
            'absolute -right-0.5 -bottom-0.5 size-4 rounded-full border-4 bg-emerald-500',
            developer ? 'border-developer-canvas' : 'border-white',
          )}
        />
      </div>

      <div>
        <div
          className={cn(
            'flex items-center gap-2.5 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-1.5',
            compact && 'flex-col items-start gap-1.5',
          )}
        >
          <h1 className="[overflow-wrap:anywhere] text-[clamp(24px,4cqw,36px)] leading-none font-semibold tracking-[-0.06em]">
            {profile.name}
          </h1>
          <Badge
            className={cn(
              'border',
              theme.borderClass,
              developer ? 'bg-white/10' : theme.softClass,
              theme.textClass,
            )}
          >
            Open to build
          </Badge>
        </div>
        <p className={cn('mt-2 mb-1 text-xs font-semibold', theme.textClass)}>
          @{profile.username}
        </p>
        <strong
          className={cn(
            'text-xs font-medium',
            developer ? 'text-developer-muted' : 'text-profile-muted',
          )}
        >
          {profile.role}
        </strong>
      </div>

      <span
        className={cn(
          'grid size-10 place-items-center rounded-xl border max-[600px]:hidden',
          compact && 'hidden',
          developer
            ? 'border-developer-border bg-developer-panel'
            : 'border-profile-border bg-stone-50',
        )}
      >
        <GitBranch aria-hidden="true" className="size-4" />
      </span>
    </header>
  )
}

function StatsSection({
  compact,
  developer,
}: {
  compact: boolean
  developer: boolean
}) {
  const metrics = [
    [profile.repositories, 'Repositories'],
    ['1.2k', 'Followers'],
    [profile.following, 'Following'],
    ['1,086', 'Contributions'],
  ]

  return (
    <div
      className={cn(
        'grid grid-cols-4 gap-px overflow-hidden rounded-xl ring-1 max-[600px]:grid-cols-2',
        compact && 'grid-cols-2',
        developer
          ? 'bg-developer-border ring-developer-border'
          : 'bg-profile-border ring-profile-border',
      )}
    >
      {metrics.map(([value, label]) => (
        <div
          className={cn(
            'p-4',
            developer ? 'bg-developer-panel' : 'bg-profile-subtle',
          )}
          key={label}
        >
          <strong className="mb-1 block text-lg tracking-[-0.04em]">
            {value}
          </strong>
          <span
            className={cn(
              'block text-[9px]',
              developer ? 'text-developer-muted' : 'text-profile-muted',
            )}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

function LanguagesSection({ developer }: { developer: boolean }) {
  return (
    <>
      <div
        aria-label="Programming language usage"
        className={cn(
          'flex h-2 overflow-hidden rounded-full',
          developer ? 'bg-developer-border' : 'bg-stone-200',
        )}
      >
        {languages.map((language) => (
          <span
            className={cn(
              'h-full border-l-2 first:border-l-0',
              developer ? 'border-developer-canvas' : 'border-white',
              language.colorClass,
              language.widthClass,
            )}
            key={language.name}
          />
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-2">
        {languages.map((language) => (
          <span
            className="inline-flex items-center gap-1.5 text-[9px] font-semibold"
            key={language.name}
          >
            <i className={cn('size-1.5 rounded-full', language.colorClass)} />
            {language.name}
            <small
              className={cn(
                'text-[8px]',
                developer ? 'text-developer-muted' : 'text-profile-muted',
              )}
            >
              {language.percentage}%
            </small>
          </span>
        ))}
      </div>
    </>
  )
}

function ContributionSection({
  compact,
  developer,
  theme,
}: {
  compact: boolean
  developer: boolean
  theme: Theme
}) {
  return (
    <Card
      className={cn(
        'grid grid-cols-[auto_1fr] items-center gap-5 rounded-xl border p-3.5 shadow-none ring-0',
        compact && 'gap-3 p-3',
        developer
          ? 'border-developer-border bg-developer-panel text-inherit'
          : 'border-profile-border bg-profile-panel',
      )}
    >
      <div>
        <strong className="block text-[11px] whitespace-nowrap">
          1,086 contributions
        </strong>
        <span
          className={cn(
            'mt-1 block text-[8px] whitespace-nowrap',
            developer ? 'text-developer-muted' : 'text-profile-muted',
          )}
        >
          in the last year
        </span>
      </div>
      <div
        aria-label="Contribution activity preview"
        className={cn(
          'grid auto-cols-[5px] grid-flow-col grid-rows-7 justify-end gap-[3px]',
        )}
      >
        {contributions.map((level, index) => (
          <i
            className={cn(
              'size-[5px] rounded-[2px]',
              theme.activityClasses[level],
            )}
            key={index + '-' + level}
          />
        ))}
      </div>
    </Card>
  )
}

export function ProfileCard({
  compact,
  enabled,
  order,
  template,
  themeIndex,
}: ProfileCardProps) {
  const developer = template === 'developer'
  const minimal = template === 'minimal'
  const theme = themeOptions[themeIndex]

  const sections: Record<ComponentId, ReactNode> = {
    about: (
      <ProfileSection developer={developer} id="about">
        <p className="max-w-3xl [overflow-wrap:anywhere] text-[15px] leading-relaxed tracking-[-0.015em]">
          {profile.bio}
        </p>
        <div
          className={cn(
            'mt-3 flex flex-wrap gap-3.5 text-[10px]',
            developer ? 'text-developer-muted' : 'text-profile-muted',
          )}
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden="true" className="size-3" /> {profile.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Building2 aria-hidden="true" className="size-3" /> Independent
          </span>
        </div>
      </ProfileSection>
    ),
    stats: (
      <ProfileSection developer={developer} id="stats">
        <StatsSection compact={compact} developer={developer} />
      </ProfileSection>
    ),
    languages: (
      <ProfileSection developer={developer} id="languages">
        <LanguagesSection developer={developer} />
      </ProfileSection>
    ),
    repositories: (
      <ProfileSection developer={developer} id="repositories">
        <div
          className={cn(
            'grid grid-cols-3 gap-2 max-[600px]:grid-cols-1',
            compact && 'grid-cols-1',
          )}
        >
          {repositories.map((repository) => (
            <RepositoryCard
              compact={compact}
              developer={developer}
              key={repository.name}
              repository={repository}
            />
          ))}
        </div>
      </ProfileSection>
    ),
    contributions: (
      <ProfileSection developer={developer} id="contributions">
        <ContributionSection
          compact={compact}
          developer={developer}
          theme={theme}
        />
      </ProfileSection>
    ),
    socials: (
      <ProfileSection developer={developer} id="socials">
        <div
          className={cn(
            'grid grid-cols-3 gap-2',
            compact && 'gap-1.5',
          )}
        >
          {socialLinks.map((link, index) => {
            const Icon = index === 0 ? Globe2 : index === 1 ? GitBranch : Mail
            return (
              <Card
                className={cn(
                  'min-w-0 rounded-xl border shadow-none ring-0',
                  compact
                    ? 'grid grid-cols-[14px_minmax(0,1fr)] items-center gap-x-1 gap-y-0 px-1.5 py-1 text-left'
                    : 'grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-1 p-2.5',
                  developer
                    ? 'border-developer-border bg-developer-panel text-inherit'
                    : 'border-profile-border bg-profile-panel',
                )}
                key={link.value}
              >
                <Icon
                  aria-hidden="true"
                  className={cn('row-span-2 size-3.5 self-center', theme.textClass)}
                />
                <small
                  className={cn(
                    'w-full overflow-hidden text-[7px] leading-tight text-ellipsis whitespace-nowrap',
                    developer ? 'text-developer-muted' : 'text-profile-muted',
                  )}
                >
                  {link.value}
                </small>
                <strong className="w-full overflow-hidden text-[8px] leading-tight text-ellipsis whitespace-nowrap">
                  {link.label}
                </strong>
              </Card>
            )
          })}
        </div>
      </ProfileSection>
    ),
  }

  return (
    <Card
      className={cn(
        'relative w-full gap-0 overflow-hidden border py-0 shadow-profile-card ring-0',
        developer
          ? 'border-developer-outline bg-developer-canvas text-developer-foreground'
          : 'border-stone-900/10 bg-paper text-profile-foreground',
        minimal
          ? 'rounded-lg shadow-profile-minimal'
          : 'rounded-3xl',
      )}
    >
      {!minimal && (
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -top-32 left-1/3 h-60 w-[420px] rounded-full bg-linear-to-br to-transparent opacity-15 blur-3xl',
            theme.gradientClass,
            developer && 'opacity-25',
          )}
        />
      )}

      <ProfileHeader
        compact={compact}
        developer={developer}
        minimal={minimal}
        theme={theme}
      />

      <div
        className={cn(
          'relative grid gap-6 px-8 py-6 max-[600px]:px-5 max-[600px]:py-5',
          compact && 'px-5 py-5',
        )}
      >
        {order.map((id) =>
          enabled[id] ? <div key={id}>{sections[id]}</div> : null,
        )}
      </div>

      <footer
        className={cn(
          'relative flex items-center justify-between border-t px-8 py-3 text-[8px] max-[600px]:px-5',
          compact && 'px-5',
          developer
            ? 'border-developer-border bg-developer-panel text-developer-muted'
            : 'border-profile-border bg-profile-subtle text-profile-muted',
        )}
      >
        <span className="inline-flex items-center gap-1.5">
          <i className={cn('size-1.5 rounded-full', theme.backgroundClass)} />
          Built from public GitHub activity
        </span>
        <span>commitcv.dev</span>
      </footer>
    </Card>
  )
}
