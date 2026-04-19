package finki.ukim.emt.booking.service.application.impl;

import finki.ukim.emt.booking.model.dto.DisplayAccommodationViewDto;
import finki.ukim.emt.booking.service.application.AccommodationViewApplicationService;
import finki.ukim.emt.booking.service.domain.AccommodationViewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccommodationViewApplicationServiceImpl implements AccommodationViewApplicationService {
    private final AccommodationViewService accommodationViewService;

    public AccommodationViewApplicationServiceImpl(AccommodationViewService accommodationViewService) {
        this.accommodationViewService = accommodationViewService;
    }

    @Override
    public List<DisplayAccommodationViewDto> findAll() {
        return DisplayAccommodationViewDto.from(accommodationViewService.findAll());
    }
}
