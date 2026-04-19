package finki.ukim.emt.booking.service.domain;

import finki.ukim.emt.booking.model.domain.AccommodationActivityLog;
import org.springframework.data.domain.Page;

public interface AccommodationActivityLogService {
    Page<AccommodationActivityLog> findAll(int page, int size);
}
