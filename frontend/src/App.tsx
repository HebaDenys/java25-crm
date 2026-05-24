import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { createLead, getCrmOverview, listLeads } from './api/crmClient'
import { AppHeader } from './components/AppHeader'
import { LeadForm } from './components/LeadForm'
import { MetricsGrid } from './components/MetricsGrid'
import { PipelinePanel } from './components/PipelinePanel'
import { initialLeadForm, toCreateLeadRequest } from './types/crm'
import type { CrmOverview, Lead } from './types/crm'
import './App.css'

function App() {
  const [overview, setOverview] = useState<CrmOverview | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [form, setForm] = useState(initialLeadForm)
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
        getCrmOverview(),
        listLeads(),
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
      await createLead(toCreateLeadRequest(form))
      setForm(initialLeadForm)
      await loadDashboard()
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Unable to save lead')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="app-shell">
      <AppHeader error={error} isLoading={isLoading} onRefresh={loadDashboard} />

      {error && <p className="alert">{error}</p>}

      <MetricsGrid overview={overview} openDeals={openDeals} />

      <section className="workspace-grid">
        <LeadForm value={form} isSaving={isSaving} onChange={setForm} onSubmit={handleSubmit} />
        <PipelinePanel overview={overview} leads={leads} isLoading={isLoading} />
      </section>
    </main>
  )
}

export default App
