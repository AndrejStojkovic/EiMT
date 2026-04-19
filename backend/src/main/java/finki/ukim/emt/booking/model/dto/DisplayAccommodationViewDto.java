package finki.ukim.emt.booking.model.dto;

import finki.ukim.emt.booking.model.enums.Category;
import finki.ukim.emt.booking.model.views.AccommodationView;

import java.util.List;

public record DisplayAccommodationViewDto(
        Long id,
        String name,
        Category category,
        int numRooms,
        String hostFullName,
        String countryName
) {
    public static DisplayAccommodationViewDto from(AccommodationView accommodationView) {
        return new DisplayAccommodationViewDto(
                accommodationView.getId(),
                accommodationView.getName(),
                accommodationView.getCategory(),
                accommodationView.getNumRooms(),
                accommodationView.getHostFullName(),
                accommodationView.getCountryName()
        );
    }

    public static List<DisplayAccommodationViewDto> from(List<AccommodationView> accommodations) {
        return accommodations.stream().map(DisplayAccommodationViewDto::from).toList();
    }
}
