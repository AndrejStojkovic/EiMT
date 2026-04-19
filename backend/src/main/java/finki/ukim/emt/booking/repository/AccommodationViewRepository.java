package finki.ukim.emt.booking.repository;

import finki.ukim.emt.booking.model.views.AccommodationView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccommodationViewRepository extends JpaRepository<AccommodationView, Long> {
}
