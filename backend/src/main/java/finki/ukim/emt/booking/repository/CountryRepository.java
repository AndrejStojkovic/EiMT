package finki.ukim.emt.booking.repository;

import finki.ukim.emt.booking.model.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
}
