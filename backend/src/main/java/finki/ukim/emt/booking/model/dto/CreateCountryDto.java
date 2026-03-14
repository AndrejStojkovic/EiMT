package finki.ukim.emt.booking.model.dto;

import finki.ukim.emt.booking.model.domain.Country;
import jakarta.validation.constraints.NotBlank;

public record CreateCountryDto(
    @NotBlank(message = "A name is required!")
    String name,
    @NotBlank(message = "A continent is required!")
    String continent
) {
    public Country toCountry() {
        return new Country(name, continent);
    }
}
