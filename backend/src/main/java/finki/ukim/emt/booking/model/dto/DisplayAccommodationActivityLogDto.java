package finki.ukim.emt.booking.model.dto;

import finki.ukim.emt.booking.model.domain.AccommodationActivityLog;
import finki.ukim.emt.booking.model.enums.AccommodationEventType;

import java.time.LocalDateTime;
import java.util.List;

public record DisplayAccommodationActivityLogDto(
        Long accommodationId,
        String accommodationName,
        AccommodationEventType eventType,
        LocalDateTime createdAt
) {
    public static DisplayAccommodationActivityLogDto from(AccommodationActivityLog accommodationActivityLog) {
        return new DisplayAccommodationActivityLogDto(
                accommodationActivityLog.getAccommodationId(),
                accommodationActivityLog.getAccommodationName(),
                accommodationActivityLog.getEventType(),
                accommodationActivityLog.getCreatedAt()
        );
    }

    public static List<DisplayAccommodationActivityLogDto> from(List<AccommodationActivityLog> accommodationActivityLogs) {
        return accommodationActivityLogs.stream().map(DisplayAccommodationActivityLogDto::from).toList();
    }
}
