UPDATE User
SET user_name = $2,
    user_address = $3,
    user_unit = $4,
    user_city = $5,
    user_state = $6,
    user_zip = $7,
    user_complex = $8,
    user_email = $9,
    user_phone = $10,
    text_permissions = $11,
    active_status = $12,
    user_role = $13
WHERE ticket_id = $1;