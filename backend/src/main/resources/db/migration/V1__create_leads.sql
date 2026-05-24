CREATE TABLE leads (
    id UUID PRIMARY KEY,
    contact_name VARCHAR(160) NOT NULL,
    company_name VARCHAR(160) NOT NULL,
    email VARCHAR(200),
    stage VARCHAR(40) NOT NULL,
    estimated_value NUMERIC(12, 2) NOT NULL DEFAULT 0,
    owner_name VARCHAR(120) NOT NULL,
    next_action VARCHAR(240) NOT NULL,
    next_action_date DATE,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_leads_stage ON leads(stage);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);