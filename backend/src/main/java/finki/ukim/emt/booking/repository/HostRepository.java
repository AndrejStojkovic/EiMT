package finki.ukim.emt.booking.repository;

import finki.ukim.emt.booking.model.domain.Host;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HostRepository extends JpaRepository<Host, Long> {
}
