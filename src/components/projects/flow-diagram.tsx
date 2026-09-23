import { ArrowRight } from 'lucide-react';
import type { DiagramGroup, DiagramNode } from '@/data/projects';

export interface FlowDiagramProps {
  kind: 'workflow' | 'architecture';
  title: string;
  /** architecture mode */
  groups?: DiagramGroup[];
  /** workflow mode */
  steps?: DiagramNode[];
}

function StepBox({ node, index }: { node: DiagramNode; index: number }) {
  return (
    <div className="flex min-w-0 max-w-full flex-1 items-start gap-3 rounded-lg border border-[var(--border)] bg-[color-mix(in_srgb,var(--primary)_8%,transparent)] px-4 py-3">
      <span
        className="mt-0.5 shrink-0 text-[11px] font-semibold tabular-nums text-muted-foreground"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium">{node.label}</span>
        {node.detail && (
          <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
            {node.detail}
          </span>
        )}
      </span>
    </div>
  );
}

/**
 * Shared pipeline/architecture graphic for all flagship case studies (REQ-12).
 * DOM boxes + CSS layout only — no mermaid/SVG assets: theme-aware through the
 * existing tokens, zero new dependencies, text stays selectable. Workflow mode
 * is an ordered list of sequential steps; architecture mode is grouped lanes.
 * Mobile: lanes and steps collapse to a vertical stack; arrows rotate.
 */
export function FlowDiagram({ kind, title, groups, steps }: FlowDiagramProps) {
  if (kind === 'workflow') {
    if (!steps || steps.length === 0) return null;
    return (
      <ol aria-label={title} className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-stretch">
        {steps.map((step, i) => (
          <li
            key={step.id}
            className="flex min-w-0 flex-col items-stretch gap-2 sm:flex-row sm:basis-[45%]"
          >
            <StepBox node={step} index={i} />
            {i < steps.length - 1 && (
              <ArrowRight
                className="mx-auto h-4 w-4 shrink-0 rotate-90 self-center text-muted-foreground sm:mx-0"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    );
  }

  if (!groups || groups.length === 0) return null;
  return (
    <div aria-label={title} role="list" className="flex flex-col gap-3">
      {groups.map((group, i) => (
        <div
          key={group.label}
          role="listitem"
          className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4"
        >
          <div className="mb-3 flex items-center gap-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              {group.label}
            </p>
            {i < groups.length - 1 && (
              <ArrowRight
                className="h-3.5 w-3.5 rotate-90 text-muted-foreground sm:rotate-0"
                aria-hidden="true"
              />
            )}
          </div>
          <ul className="flex flex-wrap gap-2">
            {group.nodes.map((node) => (
              <li
                key={node.id}
                className="max-w-full rounded-md border border-[var(--border)] bg-[color-mix(in_srgb,var(--primary)_8%,transparent)] px-3 py-1.5 text-sm"
              >
                <span className="font-medium">{node.label}</span>
                {node.detail && (
                  <span className="ml-2 text-xs text-muted-foreground">{node.detail}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
