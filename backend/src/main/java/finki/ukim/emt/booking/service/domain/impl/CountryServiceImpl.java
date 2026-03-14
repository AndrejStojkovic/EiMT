package finki.ukim.emt.booking.service.domain.impl;

import finki.ukim.emt.booking.model.domain.Country;
import finki.ukim.emt.booking.repository.CountryRepository;
import finki.ukim.emt.booking.service.domain.CountryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryServiceImpl implements CountryService {
    private final CountryRepository countryRepository;

    public CountryServiceImpl(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Country> findAll() {
        return countryRepository.findAll();
    }

    @Override
    public Optional<Country> findById(Long id) {
        return countryRepository.findById(id);
    }

    @Override
    public Country create(Country country) {
        return countryRepository.save(country);
    }

    @Override
    public Optional<Country> update(Long id, Country country) {
        return countryRepository
            .findById(id)
            .map((existingCountry) -> {
                existingCountry.setName(country.getName());
                existingCountry.setContinent(country.getContinent());
                return countryRepository.save(country);
            });
    }

    @Override
    public Optional<Country> delete(Long id) {
        Optional<Country> country = countryRepository.findById(id);
        country.ifPresent(countryRepository::delete);
        return country;
    }
}
