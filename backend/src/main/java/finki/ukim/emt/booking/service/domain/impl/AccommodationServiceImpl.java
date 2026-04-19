package finki.ukim.emt.booking.service.domain.impl;

import finki.ukim.emt.booking.event.AccommodationRentedEvent;
import finki.ukim.emt.booking.model.domain.Accommodation;
import finki.ukim.emt.booking.model.dto.FilterAccommodationDto;
import finki.ukim.emt.booking.model.enums.Condition;
import finki.ukim.emt.booking.model.exception.AccommodationInGoodConditionException;
import finki.ukim.emt.booking.model.exception.AccommodationIsRentedException;
import finki.ukim.emt.booking.model.exception.AccommodationNotAvailableException;
import finki.ukim.emt.booking.model.exception.ResourceNotFoundException;
import finki.ukim.emt.booking.model.projection.AccommodationDetailedSummaryProjection;
import finki.ukim.emt.booking.model.projection.AccommodationSummaryProjection;
import finki.ukim.emt.booking.repository.AccommodationRepository;
import finki.ukim.emt.booking.service.domain.AccommodationService;
import finki.ukim.emt.booking.specification.AccommodationSpecification;
import jakarta.transaction.Transactional;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccommodationServiceImpl implements AccommodationService {
    private final AccommodationRepository accommodationRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    public AccommodationServiceImpl(AccommodationRepository accommodationRepository, ApplicationEventPublisher applicationEventPublisher) {
        this.accommodationRepository = accommodationRepository;
        this.applicationEventPublisher = applicationEventPublisher;
    }

    @Override
    public List<Accommodation> findAll() {
        return accommodationRepository.findAll();
    }

    @Override
    public List<Accommodation> findAllByRented(Boolean rented) {
        return accommodationRepository.findAccommodationByRented(rented);
    }

    @Override
    public List<AccommodationSummaryProjection> findAllSummary() {
        return accommodationRepository.findAllSummaryProjections();
    }

    @Override
    public List<AccommodationDetailedSummaryProjection> findAllDetailedSummary() {
        return accommodationRepository.findAllDetailedSummaryProjections();
    }

    @Override
    public Accommodation findById(Long id) {
        return accommodationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Accommodation with id %d not found!", id)));
    }

    @Override
    public Accommodation create(Accommodation accommodation) {
        return accommodationRepository.save(accommodation);
    }

    @Override
    public Accommodation update(Long id, Accommodation accommodation) {
        Accommodation existingAccommodation = accommodationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Accommodation with id %d not found!", id)));
        existingAccommodation.setName(accommodation.getName());
        existingAccommodation.setCategory(accommodation.getCategory());
        existingAccommodation.setHost(accommodation.getHost());
        existingAccommodation.setNumRooms(accommodation.getNumRooms());
        return accommodationRepository.save(existingAccommodation);
    }

    @Override
    public Accommodation delete(Long id) {
        Accommodation accommodation = accommodationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Accommodation with id %d not found!", id)));

        if(accommodation.getRented()) {
            throw new AccommodationIsRentedException(accommodation.getId());
        }

        if(accommodation.getCondition() == Condition.GOOD) {
            throw new AccommodationInGoodConditionException(accommodation.getId());
        }

        accommodationRepository.delete(accommodation);
        return accommodation;
    }

    @Override
    @Transactional
    public Accommodation rent(Long id) {
        Accommodation accommodation = accommodationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Accommodation with id %d is not found!", id)));

        if(accommodation.getRented()) {
            throw new AccommodationNotAvailableException(id);
        }
        accommodation.setRented(true);
        Accommodation updated = accommodationRepository.save(accommodation);
        applicationEventPublisher.publishEvent(new AccommodationRentedEvent(updated));
        return updated;
    }

    @Override
    public Page<Accommodation> findAll(FilterAccommodationDto filter, int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        Specification<Accommodation> specification = AccommodationSpecification.withFilters(filter);
        return accommodationRepository.findAll(specification, pageable);
    }
}
