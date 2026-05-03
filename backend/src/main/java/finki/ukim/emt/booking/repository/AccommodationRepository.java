package finki.ukim.emt.booking.repository;

import finki.ukim.emt.booking.model.domain.Accommodation;
import finki.ukim.emt.booking.model.projection.AccommodationDetailedSummaryProjection;
import finki.ukim.emt.booking.model.projection.AccommodationSummaryProjection;
import lombok.NonNull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long>, JpaSpecificationExecutor<Accommodation> {
    @Override
    @EntityGraph(value = "Accommodation.withHostAndCountry", type = EntityGraph.EntityGraphType.FETCH)
    @NonNull
    List<Accommodation> findAll();

    @EntityGraph(value = "Accommodation.withHostAndCountry", type = EntityGraph.EntityGraphType.FETCH)
    List<Accommodation> findAccommodationByRented(Boolean rented);

    @Query("""
        SELECT a.id AS id,
            a.name AS name,
            a.category AS category,
            a.numRooms AS numRooms,
            CONCAT(a.host.name, ' ', a.host.surname) AS hostFullName,
            a.host.country.name AS hostCountryName
        FROM Accommodation a
    """)
    List<AccommodationSummaryProjection> findAllSummaryProjections();

    @Query("""
        SELECT a.id AS id,
           a.name AS name,
           a.category AS category,
           a.numRooms AS numRooms,
           CONCAT(a.host.name, ' ', a.host.surname) AS hostFullName,
           a.host.country.name AS hostCountryName
        FROM Accommodation a
    """)
    List<AccommodationDetailedSummaryProjection> findAllDetailedSummaryProjections();
}
