INSERT INTO Notes (
    notes_description,
    ticket_id,
    created_by,
    created_time,
    notes_attachment_id
)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;