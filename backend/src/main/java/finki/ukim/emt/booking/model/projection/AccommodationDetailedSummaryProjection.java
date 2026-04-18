package finki.ukim.emt.booking.model.projection;

import finki.ukim.emt.booking.model.enums.Category;

public interface AccommodationDetailedSummaryProjection {
    Long getId();

    String getName();

    Category getCategory();

    int getNumRooms();

    String getHostFullName();

    String getHostCountry();
}
