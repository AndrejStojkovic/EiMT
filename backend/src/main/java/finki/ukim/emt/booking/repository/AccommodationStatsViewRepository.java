package finki.ukim.emt.booking.repository;

import finki.ukim.emt.booking.model.enums.Category;
import finki.ukim.emt.booking.model.views.AccommodationStatsView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccommodationStatsViewRepository extends JpaRepository<AccommodationStatsView, Category> {
}
