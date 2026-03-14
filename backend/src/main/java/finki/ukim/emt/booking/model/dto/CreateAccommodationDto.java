package finki.ukim.emt.booking.model.dto;

import finki.ukim.emt.booking.model.domain.Accommodation;
import finki.ukim.emt.booking.model.domain.Category;
import finki.ukim.emt.booking.model.domain.Condition;
import finki.ukim.emt.booking.model.domain.Host;
import jakarta.validation.constraints.Positive;

public record CreateAccommodationDto(
    String name,
    Category category,
    Long host_id,
    Condition condition,
    @Positive
    Integer numRooms
) {
    public Accommodation toAccommodation(Host host) {
        return new Accommodation(name, category, host, condition, numRooms);
    }
}
