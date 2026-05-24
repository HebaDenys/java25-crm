INSERT INTO leads (
    id,
    contact_name,
    company_name,
    email,
    stage,
    estimated_value,
    owner_name,
    next_action,
    next_action_date,
    created_at,
    updated_at
) VALUES
(
    '11111111-1111-4111-8111-111111111111',
    'Maya Chen',
    'Northstar Logistics',
    'maya.chen@northstar.example',
    'QUALIFIED',
    42000.00,
    'Sales Team',
    'Schedule product walkthrough',
    CURRENT_DATE + INTERVAL '2 days',
    CURRENT_TIMESTAMP - INTERVAL '3 days',
    CURRENT_TIMESTAMP - INTERVAL '3 days'
),
(
    '22222222-2222-4222-8222-222222222222',
    'Jon Bell',
    'Aster Retail Group',
    'jon.bell@aster.example',
    'PROPOSAL',
    68500.00,
    'Sales Team',
    'Send revised quote',
    CURRENT_DATE + INTERVAL '1 day',
    CURRENT_TIMESTAMP - INTERVAL '2 days',
    CURRENT_TIMESTAMP - INTERVAL '2 days'
),
(
    '33333333-3333-4333-8333-333333333333',
    'Elena Rossi',
    'Brightlane Studio',
    'elena.rossi@brightlane.example',
    'NEGOTIATION',
    52000.00,
    'Sales Team',
    'Review procurement feedback',
    CURRENT_DATE + INTERVAL '4 days',
    CURRENT_TIMESTAMP - INTERVAL '1 day',
    CURRENT_TIMESTAMP - INTERVAL '1 day'
),
(
    '44444444-4444-4444-8444-444444444444',
    'Noah Silva',
    'MetroWorks',
    'noah.silva@metroworks.example',
    'NEW',
    18000.00,
    'Sales Team',
    'Qualify budget and timeline',
    CURRENT_DATE + INTERVAL '3 days',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO NOTHING;