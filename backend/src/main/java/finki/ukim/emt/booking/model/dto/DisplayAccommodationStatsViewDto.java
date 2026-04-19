package finki.ukim.emt.booking.model.dto;

import finki.ukim.emt.booking.model.enums.Category;
import finki.ukim.emt.booking.model.views.AccommodationStatsView;

import java.util.List;

public record DisplayAccommodationStatsViewDto(
        Category category,
        int totalAccommodations,
        int totalRooms,
        float averageRoomsPerAccommodation
) {
    public static DisplayAccommodationStatsViewDto from(AccommodationStatsView accommodationStatsView) {
        return new DisplayAccommodationStatsViewDto(
                accommodationStatsView.getCategory(),
                accommodationStatsView.getTotalAccommodations(),
                accommodationStatsView.getTotalRooms(),
                accommodationStatsView.getAverageRooms()
        );
    }

    public static List<DisplayAccommodationStatsViewDto> from(List<AccommodationStatsView> accommodations) {
        return accommodations.stream().map(DisplayAccommodationStatsViewDto::from).toList();
    }
}
