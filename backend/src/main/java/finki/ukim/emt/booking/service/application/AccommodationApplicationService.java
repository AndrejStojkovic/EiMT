package finki.ukim.emt.booking.service.application;

import finki.ukim.emt.booking.model.dto.CreateAccommodationDto;
import finki.ukim.emt.booking.model.dto.DisplayAccommodationDto;
import finki.ukim.emt.booking.model.dto.FilterAccommodationDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AccommodationApplicationService {
    List<DisplayAccommodationDto> findAll();

    List<DisplayAccommodationDto> findAllByRented(Boolean rented);

    DisplayAccommodationDto findById(Long id);

    DisplayAccommodationDto create(CreateAccommodationDto createAccommodationDto);

    DisplayAccommodationDto update(Long id, CreateAccommodationDto createAccommodationDto);

    DisplayAccommodationDto delete(Long id);

    DisplayAccommodationDto rent(Long id);

    Page<DisplayAccommodationDto> findAll(FilterAccommodationDto filter, int page, int size, String sortBy);
}
