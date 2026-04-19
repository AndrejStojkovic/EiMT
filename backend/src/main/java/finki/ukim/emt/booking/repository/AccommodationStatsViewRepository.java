package finki.ukim.emt.booking.repository;

import finki.ukim.emt.booking.model.enums.Category;
import finki.ukim.emt.booking.model.views.AccommodationStatsView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccommodationStatsViewRepository extends JpaRepository<AccommodationStatsView, Category> {
    @Modifying
    @Query(value = "call refresh_accommodation_stats_view()", nativeQuery = true)
    void refresh();
}
