UPDATE Notes
SET notes_description = $2,
    notes_attachement_id = $3,
    created_time = $4
WHERE notes_id = $1;