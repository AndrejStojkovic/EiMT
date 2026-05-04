package finki.ukim.emt.booking.service.application;

import finki.ukim.emt.booking.model.dto.stats.DisplayAccommodationActivityLogDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AccommodationActivityLogApplicationService {
    Page<DisplayAccommodationActivityLogDto> findAll(int page, int size);

    List<DisplayAccommodationActivityLogDto> findAll();
}
