package finki.ukim.emt.booking.service.application;

import finki.ukim.emt.booking.model.dto.DisplayAccommodationStatsViewDto;
import finki.ukim.emt.booking.model.dto.DisplayAccommodationViewDto;

import java.util.List;

public interface AccommodationViewApplicationService {
    List<DisplayAccommodationViewDto> findAllViews();

    List<DisplayAccommodationStatsViewDto> findAllStatsViews();
}
