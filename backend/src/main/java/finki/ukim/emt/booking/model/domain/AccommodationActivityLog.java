package finki.ukim.emt.booking.model.domain;

import finki.ukim.emt.booking.model.enums.AccommodationEventType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "accommodation_activity_log")
public class AccommodationActivityLog extends BaseAuditableEntity {
    @Column(nullable = false)
    private Long accommodationId;

    @Column(nullable = false)
    private String accommodationName;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AccommodationEventType eventType;

    public AccommodationActivityLog(Long accommodationId, String accommodationName, AccommodationEventType eventType) {
        this.accommodationId = accommodationId;
        this.accommodationName = accommodationName;
        this.eventType = eventType;
    }
}
