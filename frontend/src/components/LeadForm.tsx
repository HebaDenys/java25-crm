import type { FormEvent } from 'react'
import { leadStageOptions, type LeadFormState, type LeadStage } from '../types/crm'

type LeadFormProps = {
  value: LeadFormState
  isSaving: boolean
  onChange: (value: LeadFormState) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function LeadForm({ value, isSaving, onChange, onSubmit }: LeadFormProps) {
  function update<K extends keyof LeadFormState>(field: K, fieldValue: LeadFormState[K]) {
    onChange({ ...value, [field]: fieldValue })
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <h2>New lead</h2>
      <label>
        Contact
        <input required value={value.contactName} onChange={(event) => update('contactName', event.target.value)} />
      </label>
      <label>
        Company
        <input required value={value.companyName} onChange={(event) => update('companyName', event.target.value)} />
      </label>
      <label>
        Email
        <input type="email" value={value.email} onChange={(event) => update('email', event.target.value)} />
      </label>
      <div className="form-row">
        <label>
          Stage
          <select value={value.stage} onChange={(event) => update('stage', event.target.value as LeadStage)}>
            {leadStageOptions.map((stage) => (
              <option key={stage.value} value={stage.value}>
                {stage.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Value
          <input
            min="0"
            type="number"
            value={value.estimatedValue}
            onChange={(event) => update('estimatedValue', event.target.value)}
          />
        </label>
      </div>
      <label>
        Owner
        <input required value={value.ownerName} onChange={(event) => update('ownerName', event.target.value)} />
      </label>
      <label>
        Next action
        <input required value={value.nextAction} onChange={(event) => update('nextAction', event.target.value)} />
      </label>
      <label>
        Next action date
        <input
          type="date"
          value={value.nextActionDate}
          onChange={(event) => update('nextActionDate', event.target.value)}
        />
      </label>
      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Saving' : 'Create lead'}
      </button>
    </form>
  )
}