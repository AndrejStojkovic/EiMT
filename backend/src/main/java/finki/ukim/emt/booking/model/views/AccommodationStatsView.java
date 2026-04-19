package finki.ukim.emt.booking.model.views;

import finki.ukim.emt.booking.model.enums.Category;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Immutable;

@Entity
@Getter
@Immutable
@Table(name = "accommodation_stats_view")
public class AccommodationStatsView {
    @Id
    @Enumerated(EnumType.STRING)
    private Category category;

    private int totalAccommodations;

    private int totalRooms;

    private float averageRooms;
}
