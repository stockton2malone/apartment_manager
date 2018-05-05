INSERT INTO Tickets (
    created_by_id,
    complex_id,
    creation_date,
    issue_type,
    issue_description,
    urgency_level,
    permission_enter,
    permission_notifications,
    assigned_status,
    assigned_date,
    worker_id,
    ticket_status,
    completion_date
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);