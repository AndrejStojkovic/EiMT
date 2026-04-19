CREATE VIEW accommodation_view AS
SELECT a.id,
       a.name,
       a.category,
       a.num_rooms,
       TRIM(CONCAT(h.name, ' ', h.surname)) AS host_full_name,
       c.name AS country_name
FROM accommodations a
JOIN hosts h ON h.id = a.host_id
JOIN countries c ON c.id = h.country_id;