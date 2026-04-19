package finki.ukim.emt.booking.service.application;

import finki.ukim.emt.booking.model.domain.Accommodation;
import finki.ukim.emt.booking.model.dto.DisplayAccommodationViewDto;

import java.util.List;

public interface AccommodationViewApplicationService {
    List<DisplayAccommodationViewDto> findAll();
}
