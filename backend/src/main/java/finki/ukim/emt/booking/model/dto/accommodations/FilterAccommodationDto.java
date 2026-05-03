package finki.ukim.emt.booking.model.dto.accommodations;

import finki.ukim.emt.booking.model.enums.Category;

public record FilterAccommodationDto(
        Category category,
        Long hostId,
        Long hostCountryId,
        Integer numRooms,
        Boolean available
) {}
