package finki.ukim.emt.booking.service.application;

import finki.ukim.emt.booking.model.dto.CreateCountryDto;
import finki.ukim.emt.booking.model.dto.DisplayCountryDto;

import java.util.List;

public interface CountryApplicationService {
    List<DisplayCountryDto> findAll();

    DisplayCountryDto findById(Long id);

    DisplayCountryDto create(CreateCountryDto createCountryDto);

    DisplayCountryDto update(Long id, CreateCountryDto createCountryDto);

    DisplayCountryDto delete(Long id);
}
