INSERT INTO Tickets (
    user_name,
    user_address,
    user_unit,
    user_city,
    user_state,
    user_zip,
    user_complex,
    user_email,
    user_phone,
    text_permissions,
    active_status,
    user_role
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);