package finki.ukim.emt.booking.service.application.impl;

import finki.ukim.emt.booking.model.dto.stats.DisplayAccommodationStatsViewDto;
import finki.ukim.emt.booking.model.dto.views.DisplayAccommodationViewDto;
import finki.ukim.emt.booking.service.application.AccommodationViewApplicationService;
import finki.ukim.emt.booking.service.domain.AccommodationStatsViewService;
import finki.ukim.emt.booking.service.domain.AccommodationViewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccommodationViewApplicationServiceImpl implements AccommodationViewApplicationService {
    private final AccommodationViewService accommodationViewService;
    private final AccommodationStatsViewService accommodationStatsViewService;

    public AccommodationViewApplicationServiceImpl(AccommodationViewService accommodationViewService, AccommodationStatsViewService accommodationStatsViewService) {
        this.accommodationViewService = accommodationViewService;
        this.accommodationStatsViewService = accommodationStatsViewService;
    }

    @Override
    public List<DisplayAccommodationViewDto> findAllViews() {
        return DisplayAccommodationViewDto.from(accommodationViewService.findAll());
    }

    @Override
    public List<DisplayAccommodationStatsViewDto> findAllStatsViews() {
        return DisplayAccommodationStatsViewDto.from(accommodationStatsViewService.findAll());
    }
}
