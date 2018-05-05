UPDATE Tickets
SET complex_name = $2,
    complex_units = $3,
    complex_address = $4,
    complex_city = $5,
    complex_state = $6,
    complex_zip = $7,
    owner_id = $8
WHERE complex_id = $1;