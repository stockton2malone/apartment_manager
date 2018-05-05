UPDATE Notes
SET notes_description = $2,
    created_time = $3
WHERE notes_id = $1
RETURNING *;