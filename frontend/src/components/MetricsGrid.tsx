import { currency } from '../lib/formatters'
import type { CrmOverview } from '../types/crm'

type MetricsGridProps = {
  overview: CrmOverview | null
  openDeals: number
}

export function MetricsGrid({ overview, openDeals }: MetricsGridProps) {
  return (
    <section className="metric-grid" aria-label="CRM metrics">
      <article className="metric-card">
        <span>Total leads</span>
        <strong>{overview?.totalLeads ?? 0}</strong>
      </article>
      <article className="metric-card">
        <span>Pipeline value</span>
        <strong>{currency.format(overview?.pipelineValue ?? 0)}</strong>
      </article>
      <article className="metric-card">
        <span>Open deals</span>
        <strong>{openDeals}</strong>
      </article>
    </section>
  )
}