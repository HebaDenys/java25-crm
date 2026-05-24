export type LeadStage = 'NEW' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST'

export type Lead = {
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

export type StageCount = {
  stage: LeadStage
  label: string
  count: number
}

export type CrmOverview = {
  totalLeads: number
  pipelineValue: number
  pipeline: StageCount[]
  recentLeads: Lead[]
}

export type LeadFormState = {
  contactName: string
  companyName: string
  email: string
  stage: LeadStage
  estimatedValue: string
  ownerName: string
  nextAction: string
  nextActionDate: string
}

export type CreateLeadRequest = {
  contactName: string
  companyName: string
  email: string | null
  stage: LeadStage
  estimatedValue: number
  ownerName: string
  nextAction: string
  nextActionDate: string | null
}

export const leadStageOptions: Array<{ value: LeadStage; label: string }> = [
  { value: 'NEW', label: 'New' },
  { value: 'QUALIFIED', label: 'Qualified' },
  { value: 'PROPOSAL', label: 'Proposal' },
  { value: 'NEGOTIATION', label: 'Negotiation' },
  { value: 'WON', label: 'Won' },
  { value: 'LOST', label: 'Lost' },
]

export const initialLeadForm: LeadFormState = {
  contactName: '',
  companyName: '',
  email: '',
  stage: 'NEW',
  estimatedValue: '0',
  ownerName: 'Sales Team',
  nextAction: '',
  nextActionDate: '',
}

export function toCreateLeadRequest(form: LeadFormState): CreateLeadRequest {
  return {
    ...form,
    email: form.email || null,
    estimatedValue: Number(form.estimatedValue || 0),
    nextActionDate: form.nextActionDate || null,
  }
}