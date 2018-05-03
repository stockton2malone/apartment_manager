INSERT INTO Complex (
    complex_name,
    complex_units,
    complex_address,
    complex_city,
    complex_state,
    complex_zip,
    owner_id
)
VALUES ($1, $2, $3, $4, $5, $6, $7);