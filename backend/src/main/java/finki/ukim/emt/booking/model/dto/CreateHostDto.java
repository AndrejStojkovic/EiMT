package finki.ukim.emt.booking.model.dto;

import finki.ukim.emt.booking.model.domain.Country;
import finki.ukim.emt.booking.model.domain.Host;

public record CreateHostDto(
    String name,
    String surname,
    Long countryId
) {
    public Host toHost(Country country) {
        return new Host(name, surname, country);
    }
}
