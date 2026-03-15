package finki.ukim.emt.booking.model.dto;

import finki.ukim.emt.booking.model.domain.Country;

public record CreateCountryDto(
    String name,
    String continent
) {
    public Country toCountry() {
        return new Country(name, continent);
    }
}
