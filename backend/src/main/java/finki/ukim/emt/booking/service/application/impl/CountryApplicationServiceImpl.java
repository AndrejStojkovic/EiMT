package finki.ukim.emt.booking.service.application.impl;

import finki.ukim.emt.booking.model.dto.CreateCountryDto;
import finki.ukim.emt.booking.model.dto.DisplayCountryDto;
import finki.ukim.emt.booking.service.application.CountryApplicationService;
import finki.ukim.emt.booking.service.domain.CountryService;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public DisplayCountryDto findById(Long id) {
        return DisplayCountryDto.from(countryService.findById(id));
    }

    @Override
    public DisplayCountryDto create(CreateCountryDto createCountryDto) {
        return DisplayCountryDto.from(countryService.create(createCountryDto.toCountry()));
    }

    @Override
    public DisplayCountryDto update(Long id, CreateCountryDto createCountryDto) {
        return DisplayCountryDto.from(countryService.update(id, createCountryDto.toCountry()));
    }

    @Override
    public DisplayCountryDto delete(Long id) {
        return DisplayCountryDto.from(countryService.delete(id));
    }
}
