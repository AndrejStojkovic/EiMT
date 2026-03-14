package finki.ukim.emt.booking.service.application.impl;

import finki.ukim.emt.booking.model.dto.CreateCountryDto;
import finki.ukim.emt.booking.model.dto.DisplayCountryDto;
import finki.ukim.emt.booking.service.application.CountryApplicationService;
import finki.ukim.emt.booking.service.domain.CountryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryApplicationServiceImpl implements CountryApplicationService {
    private final CountryService countryService;

    public CountryApplicationServiceImpl(CountryService countryService) {
        this.countryService = countryService;
    }

    @Override
    public List<DisplayCountryDto> findAll() {
        return DisplayCountryDto.from(countryService.findAll());
    }

    @Override
    public Optional<DisplayCountryDto> findById(Long id) {
        return countryService.findById(id).map(DisplayCountryDto::from);
    }

    @Override
    public DisplayCountryDto create(CreateCountryDto createCountryDto) {
        return DisplayCountryDto.from(countryService.create(createCountryDto.toCountry()));
    }

    @Override
    public Optional<DisplayCountryDto> update(Long id, CreateCountryDto createCountryDto) {
        return countryService.update(id, createCountryDto.toCountry()).map(DisplayCountryDto::from);
    }

    @Override
    public Optional<DisplayCountryDto> delete(Long id) {
        return countryService.delete(id).map(DisplayCountryDto::from);
    }
}
