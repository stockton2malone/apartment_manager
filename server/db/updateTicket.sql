UPDATE Tickets
SET complex_id = $2,
    issue_type = $3,
    issue_description = $4,
    urgency_level = $5,
    permission_enter = $6,
    permission_notifications = $7,
    assigned_status = $8,
    assigned_date = $9,
    worker_id = $10,
    ticket_status = $11,
    completion_date = $12,
    unit_number = $13,
    tenant_disclaimer = $14,
    worker_name = $15
WHERE ticket_id = $1;