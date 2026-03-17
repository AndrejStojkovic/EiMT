package finki.ukim.emt.booking.service.application;

import finki.ukim.emt.booking.model.dto.CreateAccommodationDto;
import finki.ukim.emt.booking.model.dto.DisplayAccommodationDto;

import java.util.List;

public interface AccommodationApplicationService {
    List<DisplayAccommodationDto> findAll();

    DisplayAccommodationDto findById(Long id);

    DisplayAccommodationDto create(CreateAccommodationDto createAccommodationDto);

    DisplayAccommodationDto update(Long id, CreateAccommodationDto createAccommodationDto);

    DisplayAccommodationDto delete(Long id);

    DisplayAccommodationDto rent(Long id);
}
