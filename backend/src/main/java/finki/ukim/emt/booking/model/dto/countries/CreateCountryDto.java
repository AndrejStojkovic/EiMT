package finki.ukim.emt.booking.model.dto.countries;

import finki.ukim.emt.booking.model.domain.Country;

public record CreateCountryDto(
    String name,
    String continent
) {
    public Country toCountry() {
        return new Country(name, continent);
    }
}
