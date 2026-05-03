package finki.ukim.emt.booking.repository;

import finki.ukim.emt.booking.model.domain.Host;
import finki.ukim.emt.booking.model.projection.HostSummaryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HostRepository extends JpaRepository<Host, Long> {
    @Query("""
        SELECT h.id AS id,
            CONCAT(h.name, ' ', h.surname) AS fullName,
            SUM(a.numRooms) AS totalNumberOfRooms
        FROM Host h
        JOIN Accommodation a ON a.host.id = h.id
        GROUP BY h.id
    """)
    List<HostSummaryProjection> findAllSummaryProjections();
}
