package finki.ukim.emt.booking.service.domain;

import finki.ukim.emt.booking.model.domain.Accommodation;

import java.util.List;

public interface AccommodationService {
    List<Accommodation> findAll();

    Accommodation findById(Long id);

    Accommodation create(Accommodation accommodation);

    Accommodation update(Long id, Accommodation accommodation);

    Accommodation delete(Long id);

    Accommodation rent(Long id);
}
