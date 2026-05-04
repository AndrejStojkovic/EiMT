package finki.ukim.emt.booking.service.domain;

import finki.ukim.emt.booking.model.domain.AccommodationActivityLog;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AccommodationActivityLogService {
    Page<AccommodationActivityLog> findAll(int page, int size);

    List<AccommodationActivityLog> findAll();
}
