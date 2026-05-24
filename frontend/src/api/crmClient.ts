import type { CreateLeadRequest, CrmOverview, Lead } from '../types/crm'

type ProblemResponse = {
  title?: string
  detail?: string
  errors?: Array<{ field: string; message: string }>
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function getCrmOverview() {
  return request<CrmOverview>('/overview')
}

export function listLeads() {
  return request<Lead[]>('/leads')
}

export function createLead(payload: CreateLeadRequest) {
  return request<Lead>('/leads', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new ApiError(await errorMessage(response), response.status)
  }

  return response.json() as Promise<T>
}

async function errorMessage(response: Response) {
  try {
    const problem = (await response.json()) as ProblemResponse
    const fieldErrors = problem.errors?.map((error) => `${error.field}: ${error.message}`).join('; ')
    return fieldErrors ?? problem.detail ?? problem.title ?? `Request failed with status ${response.status}`
  } catch {
    return `Request failed with status ${response.status}`
  }
}