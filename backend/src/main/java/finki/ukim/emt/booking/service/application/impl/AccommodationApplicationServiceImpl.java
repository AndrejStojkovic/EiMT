package finki.ukim.emt.booking.service.application.impl;

import finki.ukim.emt.booking.model.domain.Accommodation;
import finki.ukim.emt.booking.model.domain.Host;
import finki.ukim.emt.booking.model.dto.CreateAccommodationDto;
import finki.ukim.emt.booking.model.dto.DisplayAccommodationDto;
import finki.ukim.emt.booking.service.application.AccommodationApplicationService;
import finki.ukim.emt.booking.service.domain.AccommodationService;
import finki.ukim.emt.booking.service.domain.HostService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccommodationApplicationServiceImpl implements AccommodationApplicationService {
    private final AccommodationService accommodationService;
    private final HostService hostService;

    public AccommodationApplicationServiceImpl(AccommodationService accommodationService, HostService hostService) {
        this.accommodationService = accommodationService;
        this.hostService = hostService;
    }

    @Override
    public List<DisplayAccommodationDto> findAll() {
        return DisplayAccommodationDto.from(accommodationService.findAll());
    }

    @Override
    public List<DisplayAccommodationDto> findAllByRented(Boolean rented) {
        return DisplayAccommodationDto.from(accommodationService.findAllByRented(rented));
    }

    @Override
    public DisplayAccommodationDto findById(Long id) {
        Accommodation accommodation = accommodationService.findById(id);
        return DisplayAccommodationDto.from(accommodation);
    }

    @Override
    public DisplayAccommodationDto create(CreateAccommodationDto createAccommodationDto) {
        Host host = hostService.findById(createAccommodationDto.hostId());
        return DisplayAccommodationDto.from(accommodationService.create(createAccommodationDto.toAccommodation(host)));
    }

    @Override
    public DisplayAccommodationDto update(Long id, CreateAccommodationDto createAccommodationDto) {
        Host host = hostService.findById(createAccommodationDto.hostId());
        return DisplayAccommodationDto.from(accommodationService.update(id, createAccommodationDto.toAccommodation(host)));
    }

    @Override
    public DisplayAccommodationDto delete(Long id) {
        return DisplayAccommodationDto.from(accommodationService.delete(id));
    }

    @Override
    public DisplayAccommodationDto rent(Long id) {
        return DisplayAccommodationDto.from(accommodationService.rent(id));
    }
}
