package finki.ukim.emt.booking.service.application.impl;

import finki.ukim.emt.booking.model.dto.stats.DisplayAccommodationActivityLogDto;
import finki.ukim.emt.booking.service.application.AccommodationActivityLogApplicationService;
import finki.ukim.emt.booking.service.domain.AccommodationActivityLogService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class AccommodationActivityLogApplicationServiceImpl implements AccommodationActivityLogApplicationService {
    private final AccommodationActivityLogService accommodationActivityLogService;

    public AccommodationActivityLogApplicationServiceImpl(AccommodationActivityLogService accommodationActivityLogService) {
        this.accommodationActivityLogService = accommodationActivityLogService;
    }

    @Override
    public Page<DisplayAccommodationActivityLogDto> findAll(int page, int size) {
        return accommodationActivityLogService.findAll(page, size)
                .map(DisplayAccommodationActivityLogDto::from);
    }
}
