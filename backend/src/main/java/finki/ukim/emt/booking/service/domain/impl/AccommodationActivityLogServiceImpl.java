package finki.ukim.emt.booking.service.domain.impl;

import finki.ukim.emt.booking.model.domain.AccommodationActivityLog;
import finki.ukim.emt.booking.repository.AccommodationActivityLogRepository;
import finki.ukim.emt.booking.service.domain.AccommodationActivityLogService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AccommodationActivityLogServiceImpl implements AccommodationActivityLogService {
    private final AccommodationActivityLogRepository accommodationActivityLogRepository;

    public AccommodationActivityLogServiceImpl(AccommodationActivityLogRepository accommodationActivityLogRepository) {
        this.accommodationActivityLogRepository = accommodationActivityLogRepository;
    }

    @Override
    public Page<AccommodationActivityLog> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return accommodationActivityLogRepository.findAll(pageable);
    }
}
