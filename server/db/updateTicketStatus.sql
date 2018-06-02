UPDATE Tickets
SET ticket_status = $2
WHERE ticket_id = $1;