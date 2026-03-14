package finki.ukim.emt.booking.service.application;

import finki.ukim.emt.booking.model.dto.CreateAccommodationDto;
import finki.ukim.emt.booking.model.dto.DisplayAccommodationDto;

import java.util.List;
import java.util.Optional;

public interface AccommodationApplicationService {
    List<DisplayAccommodationDto> findAll();

    Optional<DisplayAccommodationDto> findById(Long id);

    DisplayAccommodationDto create(CreateAccommodationDto createAccommodationDto);

    Optional<DisplayAccommodationDto> update(Long id, CreateAccommodationDto createAccommodationDto);

    Optional<DisplayAccommodationDto> delete(Long id);
}
