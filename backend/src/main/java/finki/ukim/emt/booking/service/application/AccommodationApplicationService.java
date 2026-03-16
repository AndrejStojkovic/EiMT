package finki.ukim.emt.booking.service.application;

import finki.ukim.emt.booking.model.dto.CreateAccommodationDto;
import finki.ukim.emt.booking.model.dto.DisplayAccommodationDto;

import java.util.List;
import java.util.Optional;

public interface AccommodationApplicationService {
    List<DisplayAccommodationDto> findAll();

    List<DisplayAccommodationDto> findAllByRented(Boolean rented);

    DisplayAccommodationDto findById(Long id);

    DisplayAccommodationDto create(CreateAccommodationDto createAccommodationDto);

    DisplayAccommodationDto update(Long id, CreateAccommodationDto createAccommodationDto);

    DisplayAccommodationDto delete(Long id);

    DisplayAccommodationDto rent(Long id);
}
