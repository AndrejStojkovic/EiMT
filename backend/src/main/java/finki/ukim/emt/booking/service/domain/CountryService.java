package finki.ukim.emt.booking.service.domain;

import finki.ukim.emt.booking.model.domain.Country;

import java.util.List;
import java.util.Optional;

public interface CountryService {
    List<Country> findAll();

    Optional<Country> findById(Long id);

    Country create(Country country);

    Optional<Country> update(Long id, Country country);

    Optional<Country> delete(Long id);
}
