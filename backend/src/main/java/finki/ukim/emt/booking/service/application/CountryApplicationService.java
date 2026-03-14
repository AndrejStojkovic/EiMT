package finki.ukim.emt.booking.service.application;

import finki.ukim.emt.booking.model.dto.CreateCountryDto;
import finki.ukim.emt.booking.model.dto.DisplayCountryDto;

import java.util.List;
import java.util.Optional;

public interface CountryApplicationService {
    List<DisplayCountryDto> findAll();

    Optional<DisplayCountryDto> findById(Long id);

    DisplayCountryDto create(CreateCountryDto createCountryDto);

    Optional<DisplayCountryDto> update(Long id, CreateCountryDto createCountryDto);

    Optional<DisplayCountryDto> delete(Long id);
}
