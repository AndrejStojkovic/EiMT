package finki.ukim.emt.booking.service.application.impl;

import finki.ukim.emt.booking.model.domain.Country;
import finki.ukim.emt.booking.model.dto.CreateHostDto;
import finki.ukim.emt.booking.model.dto.DisplayHostDto;
import finki.ukim.emt.booking.service.application.HostApplicationService;
import finki.ukim.emt.booking.service.domain.CountryService;
import finki.ukim.emt.booking.service.domain.HostService;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public DisplayHostDto findById(Long id) {
        return DisplayHostDto.from(hostService.findById(id));
    }

    @Override
    public DisplayHostDto create(CreateHostDto createHostDto) {
        Country country = countryService.findById(createHostDto.countryId());
        return DisplayHostDto.from(hostService.create(createHostDto.toHost(country)));
    }

    @Override
    public DisplayHostDto update(Long id, CreateHostDto createHostDto) {
        Country country = countryService.findById(createHostDto.countryId());
        return DisplayHostDto.from(hostService.update(id, createHostDto.toHost(country)));
    }

    @Override
    public DisplayHostDto delete(Long id) {
        return DisplayHostDto.from(hostService.delete(id));
    }
}
