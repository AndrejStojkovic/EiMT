package finki.ukim.emt.booking.service.domain;

import finki.ukim.emt.booking.model.domain.Accommodation;
import finki.ukim.emt.booking.model.dto.FilterAccommodationDto;
import finki.ukim.emt.booking.model.projection.AccommodationDetailedSummaryProjection;
import finki.ukim.emt.booking.model.projection.AccommodationSummaryProjection;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AccommodationService {
    List<Accommodation> findAll();

    List<Accommodation> findAllByRented(Boolean rented);

    List<AccommodationSummaryProjection> findAllSummary();

    List<AccommodationDetailedSummaryProjection> findAllDetailedSummary();

    Accommodation findById(Long id);

    Accommodation create(Accommodation accommodation);

    Accommodation update(Long id, Accommodation accommodation);

    Accommodation delete(Long id);

    Accommodation rent(Long id);

    Page<Accommodation> findAll(FilterAccommodationDto filter, int page, int size, String sortBy);
}
