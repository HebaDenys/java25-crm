import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type LeadStage = 'NEW' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST'

type Lead = {
  id: string
  contactName: string
  companyName: string
  email: string | null
  stage: LeadStage
  stageLabel: string
  estimatedValue: number
  ownerName: string
  nextAction: string
  nextActionDate: string | null
}

type StageCount = {
  stage: LeadStage
  label: string
  count: number
}

type CrmOverview = {
  totalLeads: number
  pipelineValue: number
  pipeline: StageCount[]
  recentLeads: Lead[]
}

type LeadForm = {
  contactName: string
  companyName: string
  email: string
  stage: LeadStage
  estimatedValue: string
  ownerName: string
  nextAction: string
  nextActionDate: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

const initialForm: LeadForm = {
  contactName: '',
  companyName: '',
  email: '',
  stage: 'NEW',
  estimatedValue: '0',
  ownerName: 'Sales Team',
  nextAction: '',
  nextActionDate: '',
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

function App() {
  const [overview, setOverview] = useState<CrmOverview | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [form, setForm] = useState<LeadForm>(initialForm)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const openDeals = useMemo(
    () => leads.filter((lead) => !['WON', 'LOST'].includes(lead.stage)).length,
    [leads],
  )

  async function loadDashboard() {
    setError(null)
    setIsLoading(true)
    try {
      const [nextOverview, nextLeads] = await Promise.all([
        request<CrmOverview>('/overview'),
        request<Lead[]>('/leads'),
      ])
      setOverview(nextOverview)
      setLeads(nextLeads)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Unable to load CRM data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadDashboard()
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSaving(true)

    try {
      await request<Lead>('/leads', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          email: form.email || null,
          estimatedValue: Number(form.estimatedValue || 0),
          nextActionDate: form.nextActionDate || null,
        }),
      })
      setForm(initialForm)
      await loadDashboard()
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Unable to save lead')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Java25 CRM</p>
          <h1>Sales workspace</h1>
        </div>
        <div className="status-row">
          <span className={error ? 'status status-offline' : 'status'}>
            {error ? 'API offline' : 'API connected'}
          </span>
          <button type="button" onClick={loadDashboard} disabled={isLoading}>
            Refresh
          </button>
        </div>
      </header>

      {error && <p className="alert">{error}</p>}

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

      <section className="workspace-grid">
        <form className="lead-form" onSubmit={handleSubmit}>
          <h2>New lead</h2>
          <label>
            Contact
            <input
              required
              value={form.contactName}
              onChange={(event) => setForm({ ...form, contactName: event.target.value })}
            />
          </label>
          <label>
            Company
            <input
              required
              value={form.companyName}
              onChange={(event) => setForm({ ...form, companyName: event.target.value })}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </label>
          <div className="form-row">
            <label>
              Stage
              <select
                value={form.stage}
                onChange={(event) => setForm({ ...form, stage: event.target.value as LeadStage })}
              >
                <option value="NEW">New</option>
                <option value="QUALIFIED">Qualified</option>
                <option value="PROPOSAL">Proposal</option>
                <option value="NEGOTIATION">Negotiation</option>
                <option value="WON">Won</option>
                <option value="LOST">Lost</option>
              </select>
            </label>
            <label>
              Value
              <input
                min="0"
                type="number"
                value={form.estimatedValue}
                onChange={(event) => setForm({ ...form, estimatedValue: event.target.value })}
              />
            </label>
          </div>
          <label>
            Owner
            <input
              required
              value={form.ownerName}
              onChange={(event) => setForm({ ...form, ownerName: event.target.value })}
            />
          </label>
          <label>
            Next action
            <input
              required
              value={form.nextAction}
              onChange={(event) => setForm({ ...form, nextAction: event.target.value })}
            />
          </label>
          <label>
            Next action date
            <input
              type="date"
              value={form.nextActionDate}
              onChange={(event) => setForm({ ...form, nextActionDate: event.target.value })}
            />
          </label>
          <button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving' : 'Create lead'}
          </button>
        </form>

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
      </section>
    </main>
  )
}

export default App
