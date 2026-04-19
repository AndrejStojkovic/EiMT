package finki.ukim.emt.booking.model.views;

import finki.ukim.emt.booking.model.enums.Category;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Immutable;

@Entity
@Getter
@Setter
@Immutable
@Table(name = "accommodation_view")
public class AccommodationView {
    @Id
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Category category;

    private int numRooms;

    private String hostFullName;

    private String countryName;
}
