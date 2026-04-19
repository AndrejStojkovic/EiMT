package finki.ukim.emt.booking.service.application;

import finki.ukim.emt.booking.model.dto.DisplayAccommodationActivityLogDto;
import org.springframework.data.domain.Page;

public interface AccommodationActivityLogApplicationService {
    Page<DisplayAccommodationActivityLogDto> findAll(int page, int size, String sortBy);
}
