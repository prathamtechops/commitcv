import type { ComponentType } from 'react'
import {
  BarChart3,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  Languages,
  LayoutTemplate,
  Link2,
  Rows3,
  UserRound,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  componentLabels,
  templateOptions,
  themeOptions,
  type ComponentId,
  type TemplateId,
} from '@/data/profile'
import { cn } from '@/lib/utils'

const icons: Record<ComponentId, ComponentType<{ className?: string }>> = {
  about: UserRound,
  stats: BarChart3,
  languages: Languages,
  repositories: FolderGit2,
  contributions: Rows3,
  socials: Link2,
}

type BuilderSidebarProps = {
  enabled: Record<ComponentId, boolean>
  order: ComponentId[]
  template: TemplateId
  themeIndex: number
  onToggle: (id: ComponentId) => void
  onMove: (id: ComponentId, direction: -1 | 1) => void
  onTemplateChange: (id: TemplateId) => void
  onThemeChange: (index: number) => void
}

type ComponentRowProps = {
  id: ComponentId
  index: number
  total: number
  enabled: boolean
  onToggle: (id: ComponentId) => void
  onMove: (id: ComponentId, direction: -1 | 1) => void
}

function ComponentRow({
  id,
  index,
  total,
  enabled,
  onToggle,
  onMove,
}: ComponentRowProps) {
  const Icon = icons[id]
  const label = componentLabels[id]

  return (
    <div className="grid min-h-14 grid-cols-[24px_34px_1fr_auto] items-center gap-2 rounded-xl border border-transparent px-2 py-1.5 transition hover:border-stone-200 hover:bg-white hover:shadow-[0_8px_24px_rgb(47_43_36_/_0.05)]">
      <span className="flex flex-col gap-0.5">
        <Button
          aria-label={'Move ' + label + ' up'}
          className="size-5 rounded-sm text-stone-400 hover:bg-stone-200 hover:text-stone-900"
          disabled={index === 0}
          onClick={() => onMove(id, -1)}
          size="icon-xs"
          variant="ghost"
        >
          <ChevronUp aria-hidden="true" className="size-3" />
        </Button>
        <Button
          aria-label={'Move ' + label + ' down'}
          className="size-5 rounded-sm text-stone-400 hover:bg-stone-200 hover:text-stone-900"
          disabled={index === total - 1}
          onClick={() => onMove(id, 1)}
          size="icon-xs"
          variant="ghost"
        >
          <ChevronDown aria-hidden="true" className="size-3" />
        </Button>
      </span>

      <span className="grid size-8 place-items-center rounded-lg bg-stone-100 text-stone-600">
        <Icon aria-hidden="true" className="size-4" />
      </span>

      <label
        className="overflow-hidden text-xs font-semibold text-ellipsis whitespace-nowrap"
        htmlFor={id}
      >
        {label}
      </label>

      <Switch
        aria-label={'Show ' + label}
        checked={enabled}
        id={id}
        onCheckedChange={() => onToggle(id)}
      />
    </div>
  )
}

function TemplateThumbnail({ template }: { template: TemplateId }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex h-12 w-[70px] shrink-0 flex-col gap-1 overflow-hidden rounded-lg p-2',
        template === 'minimal' && 'bg-stone-100',
        template === 'modern' && 'bg-orange-50',
        template === 'developer' && 'bg-[#1c2220]',
      )}
    >
      <i
        className={cn(
          'h-2 w-[45%] rounded-full bg-stone-400',
          template === 'modern' && 'bg-orange-500',
          template === 'developer' && 'bg-emerald-400',
        )}
      />
      <i
        className={cn(
          'h-1 w-[85%] rounded-full bg-stone-300',
          template === 'developer' && 'bg-slate-600',
        )}
      />
      <i
        className={cn(
          'h-1 w-2/3 rounded-full bg-stone-300',
          template === 'developer' && 'bg-slate-600',
        )}
      />
    </span>
  )
}

export function BuilderSidebar({
  enabled,
  order,
  template,
  themeIndex,
  onToggle,
  onMove,
  onTemplateChange,
  onThemeChange,
}: BuilderSidebarProps) {
  const activeCount = Object.values(enabled).filter(Boolean).length

  return (
    <aside className="min-h-[calc(100vh-74px)] border-r border-stone-200 bg-white/80 max-[760px]:min-h-0 max-[760px]:w-full max-[760px]:border-r-0 max-[760px]:border-b">
      <div className="sticky top-[74px] px-5 py-7 max-[760px]:static max-[760px]:w-full max-[760px]:px-4 max-[760px]:py-5">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="mb-1 text-[10px] font-bold tracking-[0.12em] text-stone-500 uppercase">
              Build your profile
            </p>
            <h2 className="text-[22px] font-semibold tracking-[-0.045em]">
              Make it yours
            </h2>
          </div>
          <Badge variant="secondary">{activeCount}/6</Badge>
        </div>

        <Tabs defaultValue="components" className="w-full">
          <TabsList className="grid h-10 w-full grid-cols-2 rounded-xl bg-stone-200/70 p-1">
            <TabsTrigger value="components" className="rounded-lg">
              Components
            </TabsTrigger>
            <TabsTrigger value="templates" className="rounded-lg">
              Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="mt-5">
            <div className="flex flex-col gap-1 max-[760px]:grid max-[760px]:grid-cols-2 max-[460px]:grid-cols-1">
              {order.map((id, index) => (
                <ComponentRow
                  enabled={enabled[id]}
                  id={id}
                  index={index}
                  key={id}
                  onMove={onMove}
                  onToggle={onToggle}
                  total={order.length}
                />
              ))}
            </div>

            <Card className="mt-5 flex-row gap-2 rounded-xl border border-[#e7dfd2] bg-[#faf5ec] p-3 text-[#7a756d] shadow-none ring-0 max-[760px]:hidden">
              <LayoutTemplate
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-[#9b673d]"
              />
              <div>
                <strong className="block text-[11px] text-stone-800">
                  README-friendly layout
                </strong>
                <p className="mt-1 text-[10px] leading-relaxed">
                  Reordering changes section order—not free x and y positioning.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="mt-5">
            <div className="flex flex-col gap-2">
              {templateOptions.map((option) => (
                <Button
                  className={cn(
                    'h-auto w-full justify-start gap-3 whitespace-normal rounded-xl border-stone-200 bg-white p-2 text-left shadow-none hover:border-stone-800 hover:bg-white hover:shadow-[0_8px_24px_rgb(47_43_36_/_0.08)]',
                    template === option.id &&
                      'border-stone-800 ring-2 ring-stone-900/10',
                  )}
                  key={option.id}
                  onClick={() => onTemplateChange(option.id)}
                  variant="outline"
                >
                  <TemplateThumbnail template={option.id} />
                  <span className="min-w-0">
                    <strong className="mb-1 block text-xs">
                      {option.name}
                    </strong>
                    <small className="block text-[9px] leading-snug font-normal text-stone-500">
                      {option.description}
                    </small>
                  </span>
                </Button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-stone-200 pt-4">
              <div>
                <p className="mb-1 text-[10px] font-bold tracking-[0.12em] text-stone-500 uppercase">
                  Accent
                </p>
                <strong className="text-xs">
                  {themeOptions[themeIndex].name}
                </strong>
              </div>
              <div
                aria-label="Accent colour"
                className="flex gap-2"
                role="radiogroup"
              >
                {themeOptions.map((option, index) => (
                  <Button
                    aria-checked={themeIndex === index}
                    aria-label={option.name}
                    className={cn(
                      'size-6 rounded-full border-[3px] border-white p-0 ring-1 ring-stone-300 hover:scale-105',
                      option.swatchClass,
                      themeIndex === index && 'ring-2 ring-stone-900',
                    )}
                    key={option.name}
                    onClick={() => onThemeChange(index)}
                    role="radio"
                    size="icon-xs"
                    variant="ghost"
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </aside>
  )
}
