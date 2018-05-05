INSERT INTO Users (
    user_id,
    user_name,
    user_unit,
    user_complex,
    user_email,
    user_phone,
    text_permissions,
    active_status,
    user_role
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);