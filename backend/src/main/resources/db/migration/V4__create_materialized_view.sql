CREATE MATERIALIZED VIEW accommodation_stats_view AS
SELECT a.category,
       COUNT(a.id) AS total_accommodations,
       SUM(a.num_rooms) AS total_rooms,
       CAST(AVG(a.num_rooms) AS FLOAT) average_rooms
FROM accommodations a
group by a.category