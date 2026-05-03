package finki.ukim.emt.booking.service.application;

import finki.ukim.emt.booking.model.dto.accommodations.CreateAccommodationDto;
import finki.ukim.emt.booking.model.dto.accommodations.DisplayAccommodationDto;
import finki.ukim.emt.booking.model.dto.accommodations.FilterAccommodationDto;
import finki.ukim.emt.booking.model.projection.AccommodationDetailedSummaryProjection;
import finki.ukim.emt.booking.model.projection.AccommodationSummaryProjection;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AccommodationApplicationService {
    List<DisplayAccommodationDto> findAll();

    List<DisplayAccommodationDto> findAllByRented(Boolean rented);

    List<AccommodationSummaryProjection> findAllSummary();

    List<AccommodationDetailedSummaryProjection> findAllDetailedSummary();

    DisplayAccommodationDto findById(Long id);

    DisplayAccommodationDto create(CreateAccommodationDto createAccommodationDto);

    DisplayAccommodationDto update(Long id, CreateAccommodationDto createAccommodationDto);

    DisplayAccommodationDto delete(Long id);

    DisplayAccommodationDto rent(Long id);

    DisplayAccommodationDto unrent(Long id);

    Page<DisplayAccommodationDto> findAll(FilterAccommodationDto filter, int page, int size, String sortBy);
}
