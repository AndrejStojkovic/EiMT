package finki.ukim.emt.booking.service.domain.impl;

import finki.ukim.emt.booking.model.views.AccommodationView;
import finki.ukim.emt.booking.repository.AccommodationViewRepository;
import finki.ukim.emt.booking.service.domain.AccommodationViewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccommodationViewServiceImpl implements AccommodationViewService {
    private final AccommodationViewRepository accommodationViewRepository;

    AccommodationViewServiceImpl(AccommodationViewRepository accommodationViewRepository) {
        this.accommodationViewRepository = accommodationViewRepository;
    }

    @Override
    public List<AccommodationView> findAll() {
        return accommodationViewRepository.findAll();
    }
}
