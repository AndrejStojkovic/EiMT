package finki.ukim.emt.booking.service.domain.impl;

import finki.ukim.emt.booking.model.domain.Accommodation;
import finki.ukim.emt.booking.model.exception.AccommodationNotAvailableException;
import finki.ukim.emt.booking.model.exception.ResourceNotFoundException;
import finki.ukim.emt.booking.repository.AccommodationRepository;
import finki.ukim.emt.booking.service.domain.AccommodationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccommodationServiceImpl implements AccommodationService {
    private final AccommodationRepository accommodationRepository;

    public AccommodationServiceImpl(AccommodationRepository accommodationRepository) {
        this.accommodationRepository = accommodationRepository;
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
        accommodationRepository.delete(accommodation);
        return accommodation;
    }

    @Override
    public Accommodation rent(Long id) {
        Accommodation accommodation = accommodationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Accommodation with id %d is not found!", id)));

        if(accommodation.getRented()) {
            throw new AccommodationNotAvailableException(id);
        }
        accommodation.setRented(true);
        return accommodationRepository.save(accommodation);
    }
}
