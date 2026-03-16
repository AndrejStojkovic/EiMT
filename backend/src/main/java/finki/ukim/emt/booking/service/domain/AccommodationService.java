package finki.ukim.emt.booking.service.domain;

import finki.ukim.emt.booking.model.domain.Accommodation;

import java.util.List;
import java.util.Optional;

public interface AccommodationService {
    List<Accommodation> findAll();

    List<Accommodation> findAllByRented(Boolean rented);

    Accommodation findById(Long id);

    Accommodation create(Accommodation accommodation);

    Accommodation update(Long id, Accommodation accommodation);

    Accommodation delete(Long id);

    Accommodation rent(Long id);
}
