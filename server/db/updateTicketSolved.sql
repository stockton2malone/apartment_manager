UPDATE Tickets
SET ticket_status = $2,
    completion_date = $3,
    completed_status = $4
WHERE ticket_id = $1;