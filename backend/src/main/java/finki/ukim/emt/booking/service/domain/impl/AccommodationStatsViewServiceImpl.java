package finki.ukim.emt.booking.service.domain.impl;

import finki.ukim.emt.booking.model.views.AccommodationStatsView;
import finki.ukim.emt.booking.repository.AccommodationStatsViewRepository;
import finki.ukim.emt.booking.service.domain.AccommodationStatsViewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccommodationStatsViewServiceImpl implements AccommodationStatsViewService {
    private final AccommodationStatsViewRepository accommodationStatsViewRepository;

    public AccommodationStatsViewServiceImpl(AccommodationStatsViewRepository accommodationStatsViewRepository) {
        this.accommodationStatsViewRepository = accommodationStatsViewRepository;
    }

    @Override
    public List<AccommodationStatsView> findAll() {
        return accommodationStatsViewRepository.findAll();
    }
}
