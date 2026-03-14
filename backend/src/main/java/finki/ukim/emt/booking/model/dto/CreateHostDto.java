package finki.ukim.emt.booking.model.dto;

import finki.ukim.emt.booking.model.domain.Country;
import finki.ukim.emt.booking.model.domain.Host;
import jakarta.validation.constraints.NotBlank;

public record CreateHostDto(
    @NotBlank(message = "A name is required!")
    String name,
    @NotBlank(message = "A surname is required!")
    String surname,
    @NotBlank(message = "A country ID is required!")
    Long countryId
) {
    public Host toHost(Country country) {
        return new Host(name, surname, country);
    }
}
