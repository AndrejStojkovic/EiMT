package finki.ukim.emt.booking.model.domain;

import finki.ukim.emt.booking.model.enums.Category;
import finki.ukim.emt.booking.model.enums.Condition;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "accommodations")
public class Accommodation extends BaseAuditableEntity {
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "host_id", nullable = false)
    private Host host;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Condition condition;

    @Column(nullable = false)
    private Integer numRooms;

    public Accommodation(String name, Category category, Host host, Condition condition, Integer numRooms) {
        this.name = name;
        this.category = category;
        this.host = host;
        this.condition = condition;
        this.numRooms = numRooms;
    }
}
