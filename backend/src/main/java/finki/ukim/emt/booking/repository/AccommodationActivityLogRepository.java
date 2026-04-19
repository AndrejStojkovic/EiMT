package finki.ukim.emt.booking.repository;

import finki.ukim.emt.booking.model.domain.AccommodationActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccommodationActivityLogRepository extends JpaRepository<AccommodationActivityLog, Long> {
}
