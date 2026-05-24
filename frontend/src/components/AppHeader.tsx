type AppHeaderProps = {
  error: string | null
  isLoading: boolean
  onRefresh: () => void
}

export function AppHeader({ error, isLoading, onRefresh }: AppHeaderProps) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Java25 CRM</p>
        <h1>Sales workspace</h1>
      </div>
      <div className="status-row">
        <span className={error ? 'status status-offline' : 'status'}>
          {error ? 'API offline' : 'API connected'}
        </span>
        <button type="button" onClick={onRefresh} disabled={isLoading}>
          Refresh
        </button>
      </div>
    </header>
  )
}