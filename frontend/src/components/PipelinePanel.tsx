import { currency } from '../lib/formatters'
import type { CrmOverview, Lead } from '../types/crm'

type PipelinePanelProps = {
  overview: CrmOverview | null
  leads: Lead[]
  isLoading: boolean
}

export function PipelinePanel({ overview, leads, isLoading }: PipelinePanelProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Pipeline</h2>
        <span>{isLoading ? 'Loading' : `${leads.length} records`}</span>
      </div>
      <div className="pipeline-list">
        {(overview?.pipeline ?? []).map((stage) => (
          <div className="pipeline-row" key={stage.stage}>
            <span>{stage.label}</span>
            <meter min="0" max={Math.max(overview?.totalLeads ?? 1, 1)} value={stage.count} />
            <strong>{stage.count}</strong>
          </div>
        ))}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Contact</th>
              <th>Company</th>
              <th>Stage</th>
              <th>Value</th>
              <th>Next action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>
                  <strong>{lead.contactName}</strong>
                  <span>{lead.email ?? 'No email'}</span>
                </td>
                <td>{lead.companyName}</td>
                <td>
                  <span className={`stage stage-${lead.stage.toLowerCase()}`}>{lead.stageLabel}</span>
                </td>
                <td>{currency.format(lead.estimatedValue)}</td>
                <td>
                  <strong>{lead.nextAction}</strong>
                  <span>{lead.nextActionDate ?? 'No date set'}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}