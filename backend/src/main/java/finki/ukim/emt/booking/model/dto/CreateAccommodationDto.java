package finki.ukim.emt.booking.model.dto;

import finki.ukim.emt.booking.model.domain.Accommodation;
import finki.ukim.emt.booking.model.enums.Category;
import finki.ukim.emt.booking.model.enums.Condition;
import finki.ukim.emt.booking.model.domain.Host;
import jakarta.validation.constraints.Positive;

public record CreateAccommodationDto(
    String name,
    Category category,
    Long hostId,
    Condition condition,
    @Positive
    Integer numRooms
) {
    public Accommodation toAccommodation(Host host) {
        return new Accommodation(name, category, host, condition, numRooms);
    }
}
