package finki.ukim.emt.booking.service.application.impl;

import finki.ukim.emt.booking.model.domain.Country;
import finki.ukim.emt.booking.model.dto.CreateHostDto;
import finki.ukim.emt.booking.model.dto.DisplayHostDto;
import finki.ukim.emt.booking.model.exception.ResourceNotFoundException;
import finki.ukim.emt.booking.service.application.HostApplicationService;
import finki.ukim.emt.booking.service.domain.CountryService;
import finki.ukim.emt.booking.service.domain.HostService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HostApplicationServiceImpl implements HostApplicationService {
    private final HostService hostService;
    private final CountryService countryService;

    public HostApplicationServiceImpl(HostService hostService, CountryService countryService) {
        this.hostService = hostService;
        this.countryService = countryService;
    }

    @Override
    public List<DisplayHostDto> findAll() {
        return DisplayHostDto.from(hostService.findAll());
    }

    @Override
    public Optional<DisplayHostDto> findById(Long id) {
        return hostService.findById(id).map(DisplayHostDto::from);
    }

    @Override
    public DisplayHostDto create(CreateHostDto createHostDto) {
        Country country = countryService.findById(createHostDto.countryId())
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Country with id %d not found!", createHostDto.countryId())));
        return DisplayHostDto.from(hostService.create(createHostDto.toHost(country)));
    }

    @Override
    public Optional<DisplayHostDto> update(Long id, CreateHostDto createHostDto) {
        Country country = countryService.findById(createHostDto.countryId())
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Country with id %d not found!", createHostDto.countryId())));
        return hostService.update(id, createHostDto.toHost(country)).map(DisplayHostDto::from);
    }

    @Override
    public Optional<DisplayHostDto> delete(Long id) {
        return hostService.delete(id).map(DisplayHostDto::from);
    }
}
