package finki.ukim.emt.booking.repository;

import finki.ukim.emt.booking.model.domain.Accommodation;
import finki.ukim.emt.booking.model.projection.AccommodationDetailedSummaryProjection;
import finki.ukim.emt.booking.model.projection.AccommodationSummaryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long>, JpaSpecificationExecutor<Accommodation> {
    List<Accommodation> findAccommodationByRented(Boolean rented);

    @Query("""
        select a.id as id,
            a.name as name,
            a.category as category,
            a.numRooms as numRooms,
            concat(a.host.name, ' ', a.host.surname) as hostFullName,
            a.host.country.name as hostCountryName
        from Accommodation a
    """)
    List<AccommodationSummaryProjection> findAllSummaryProjections();

    @Query("""
        select a.id as id,
           a.name as name,
           a.category as category,
           a.numRooms as numRooms,
           concat(a.host.name, ' ', a.host.surname) as hostFullName,
           a.host.country.name as hostCountryName
        from Accommodation a
    """)
    List<AccommodationDetailedSummaryProjection> findAllDetailedSummaryProjections();
}
