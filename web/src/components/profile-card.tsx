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
  type TextSizeId,
} from '@/data/profile'
import { cn } from '@/lib/utils'

type ProfileCardProps = {
  compact: boolean
  enabled: Record<ComponentId, boolean>
  order: ComponentId[]
  template: TemplateId
  textSize: TextSizeId
  themeIndex: number
}

type ProfileSectionProps = {
  children: ReactNode
  id: ComponentId
}

type Repository = (typeof repositories)[number]
type Theme = (typeof themeOptions)[number]

function ProfileSection({
  children,
  id,
}: ProfileSectionProps) {
  return (
    <section>
      <div className="profile-type-heading mb-3 flex items-center gap-2.5 font-bold tracking-[0.13em] text-profile-theme-muted uppercase">
        <span>{componentLabels[id]}</span>
        <Separator className="flex-1 bg-profile-theme-border" />
      </div>
      {children}
    </section>
  )
}

function RepositoryCard({
  compact,
  repository,
}: {
  compact: boolean
  repository: Repository
}) {
  return (
    <Card className="gap-0 rounded-xl border border-profile-theme-border bg-profile-theme-panel p-3.5 text-inherit shadow-none ring-0">
      <div className="flex items-center justify-between text-profile-theme-muted">
        <GitBranch aria-hidden="true" className="size-3.5" />
        <ArrowUpRight aria-hidden="true" className="size-3.5" />
      </div>
      <h4 className="profile-type-repository mt-3 mb-1.5 overflow-hidden font-mono font-bold text-ellipsis whitespace-nowrap">
        {repository.name}
      </h4>
      <p
        className={cn(
          'profile-type-description overflow-hidden leading-relaxed text-profile-theme-muted',
          !compact && 'min-h-9 max-[600px]:min-h-0',
        )}
      >
        {repository.description}
      </p>
      <div className="profile-type-detail mt-3 flex items-center gap-2.5 text-profile-theme-muted">
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
  dark,
  minimal,
  theme,
}: {
  compact: boolean
  dark: boolean
  minimal: boolean
  theme: Theme
}) {
  return (
    <header
      className={cn(
        'relative grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b px-8 py-7 max-[600px]:grid-cols-[auto_1fr] max-[600px]:px-5 max-[600px]:py-5',
        compact && 'grid-cols-[auto_1fr] px-5 py-5',
        'border-profile-theme-border',
      )}
    >
      <div
        aria-label={profile.name + ' avatar placeholder'}
        className={cn(
          'relative grid size-[76px] place-items-center rounded-3xl border-[5px] border-profile-theme-canvas bg-linear-to-br to-profile-theme-highlight text-white shadow-profile-avatar max-[600px]:size-[62px] max-[600px]:rounded-2xl',
          theme.gradientClass,
          minimal && 'rounded-full',
          compact && 'size-[62px] rounded-2xl',
        )}
      >
        <span className="profile-type-avatar font-bold tracking-[-0.06em]">
          {profile.initials}
        </span>
        <i
          className={cn(
            'absolute -right-0.5 -bottom-0.5 size-4 rounded-full border-4 bg-emerald-500',
            'border-profile-theme-canvas',
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
          <h1 className="profile-type-display [overflow-wrap:anywhere] leading-none font-semibold tracking-[-0.06em]">
            {profile.name}
          </h1>
          <Badge
            className={cn(
              'profile-type-label border',
              theme.borderClass,
              dark ? 'bg-white/10' : theme.softClass,
              dark ? theme.darkTextClass : theme.textClass,
            )}
          >
            Open to build
          </Badge>
        </div>
        <p
          className={cn(
            'profile-type-label mt-2 mb-1 font-semibold',
            dark ? theme.darkTextClass : theme.textClass,
          )}
        >
          @{profile.username}
        </p>
        <strong className="profile-type-label font-medium text-profile-theme-muted">
          {profile.role}
        </strong>
      </div>

      <span
        className={cn(
          'grid size-10 place-items-center rounded-xl border max-[600px]:hidden',
          compact && 'hidden',
          'border-profile-theme-border bg-profile-theme-panel',
        )}
      >
        <GitBranch aria-hidden="true" className="size-4" />
      </span>
    </header>
  )
}

function StatsSection({
  compact,
}: {
  compact: boolean
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
        'bg-profile-theme-border ring-profile-theme-border',
      )}
    >
      {metrics.map(([value, label]) => (
        <div className="bg-profile-theme-subtle p-4" key={label}>
          <strong className="profile-type-stat mb-1 block tracking-[-0.04em]">
            {value}
          </strong>
          <span className="profile-type-description block text-profile-theme-muted">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

function LanguagesSection() {
  return (
    <>
      <div
        aria-label="Programming language usage"
        className="flex h-2 overflow-hidden rounded-full bg-profile-theme-border"
      >
        {languages.map((language) => (
          <span
            className={cn(
              'h-full border-l-2 first:border-l-0',
              'border-profile-theme-canvas',
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
            className="profile-type-description inline-flex items-center gap-1.5 font-semibold"
            key={language.name}
          >
            <i className={cn('size-1.5 rounded-full', language.colorClass)} />
            {language.name}
            <small className="profile-type-detail text-profile-theme-muted">
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
  theme,
}: {
  compact: boolean
  theme: Theme
}) {
  return (
    <Card
      className={cn(
        'grid grid-cols-[auto_1fr] items-center gap-5 rounded-xl border border-profile-theme-border bg-profile-theme-panel p-3.5 text-inherit shadow-none ring-0',
        compact && 'gap-3 p-3',
      )}
    >
      <div>
        <strong className="profile-type-repository block whitespace-nowrap">
          1,086 contributions
        </strong>
        <span className="profile-type-detail mt-1 block text-profile-theme-muted whitespace-nowrap">
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
  textSize,
  themeIndex,
}: ProfileCardProps) {
  const dark = template === 'developer' || template === 'midnight'
  const minimal = template === 'minimal'
  const theme = themeOptions[themeIndex]

  const sections: Record<ComponentId, ReactNode> = {
    about: (
      <ProfileSection id="about">
        <p className="profile-type-body max-w-3xl [overflow-wrap:anywhere] leading-relaxed tracking-[-0.015em]">
          {profile.bio}
        </p>
        <div className="profile-type-meta mt-3 flex flex-wrap gap-3.5 text-profile-theme-muted">
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
      <ProfileSection id="stats">
        <StatsSection compact={compact} />
      </ProfileSection>
    ),
    languages: (
      <ProfileSection id="languages">
        <LanguagesSection />
      </ProfileSection>
    ),
    repositories: (
      <ProfileSection id="repositories">
        <div
          className={cn(
            'grid grid-cols-3 gap-2 max-[600px]:grid-cols-1',
            compact && 'grid-cols-1',
          )}
        >
          {repositories.map((repository) => (
            <RepositoryCard
              compact={compact}
              key={repository.name}
              repository={repository}
            />
          ))}
        </div>
      </ProfileSection>
    ),
    contributions: (
      <ProfileSection id="contributions">
        <ContributionSection compact={compact} theme={theme} />
      </ProfileSection>
    ),
    socials: (
      <ProfileSection id="socials">
        <div className={cn('grid grid-cols-3 gap-2', compact && 'gap-1.5')}>
          {socialLinks.map((link, index) => {
            const Icon = index === 0 ? Globe2 : index === 1 ? GitBranch : Mail
            return (
              <Card
                className={cn(
                  'min-w-0 rounded-xl border shadow-none ring-0',
                  compact
                    ? 'grid grid-cols-[14px_minmax(0,1fr)] items-center gap-x-1 gap-y-0 px-1.5 py-1 text-left'
                    : 'grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-1 p-2.5',
                  'border-profile-theme-border bg-profile-theme-panel text-inherit',
                )}
                key={link.value}
              >
                <Icon
                  aria-hidden="true"
                  className={cn(
                    'row-span-2 size-3.5 self-center',
                    dark ? theme.darkTextClass : theme.textClass,
                  )}
                />
                <small className="profile-type-social-label w-full overflow-hidden leading-tight text-ellipsis whitespace-nowrap text-profile-theme-muted">
                  {link.value}
                </small>
                <strong className="profile-type-social-value w-full overflow-hidden leading-tight text-ellipsis whitespace-nowrap">
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
        'profile-card relative w-full gap-0 overflow-hidden border border-profile-theme-outline bg-profile-theme-canvas py-0 text-profile-theme-foreground shadow-profile-card ring-0',
        minimal
          ? 'rounded-lg shadow-profile-minimal'
          : 'rounded-3xl',
      )}
      data-template={template}
      data-text-size={textSize}
    >
      {!minimal && (
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -top-32 left-1/3 h-60 w-[420px] rounded-full bg-linear-to-br to-transparent opacity-15 blur-3xl',
            theme.gradientClass,
            dark && 'opacity-25',
          )}
        />
      )}

      <ProfileHeader
        compact={compact}
        dark={dark}
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
          'relative flex items-center justify-between border-t px-8 py-3 max-[600px]:px-5',
          compact && 'px-5',
          'profile-type-detail border-profile-theme-border bg-profile-theme-subtle text-profile-theme-muted',
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
