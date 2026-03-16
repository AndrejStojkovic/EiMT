package finki.ukim.emt.booking.repository;

import finki.ukim.emt.booking.model.domain.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
    List<Accommodation> findAccommodationByRented(Boolean rented);
}
