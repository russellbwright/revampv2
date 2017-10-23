-- INSERT INTO projects (company, units, description, type, budget, last_name, first_name, long_desc) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
INSERT INTO projects (last_name, first_name, email, com_name, proj_address, state, zip, main_proj, budget, type, units, short_desc, long_desc, proj_name, city, userid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);
SELECT * FROM projects ORDER BY projectid DESC LIMIT 1;
