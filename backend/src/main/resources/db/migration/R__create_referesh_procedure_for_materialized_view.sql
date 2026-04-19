CREATE OR REPLACE PROCEDURE refresh_accommodation_stats_view()
LANGUAGE sql
AS $$
    REFRESH MATERIALIZED VIEW accommodation_stats_view
$$