package finki.ukim.emt.booking.model.dto;

import finki.ukim.emt.booking.model.enums.Category;

public record FilterAccommodationDto(
        Category category,
        Long hostId,
        Long hostCountryId,
        int numRooms,
        Boolean available
) {}
