package finki.ukim.emt.booking.service.domain;

import finki.ukim.emt.booking.model.domain.Accommodation;

import java.util.List;
import java.util.Optional;

public interface AccommodationService {
    List<Accommodation> findAll();

    Optional<Accommodation> findById(Long id);

    Accommodation create(Accommodation accommodation);

    Optional<Accommodation> update(Long id, Accommodation accommodation);

    Optional<Accommodation> delete(Long id);

    Accommodation rent(Long id);
}
