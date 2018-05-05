UPDATE User
SET user_name = $2,
    user_unit = $3,
    user_complex = $4,
    user_email = $5,
    user_phone = $6,
    text_permissions = $7,
    active_status = $8,
    user_role = $9
WHERE user_id = $1;