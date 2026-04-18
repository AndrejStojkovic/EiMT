package finki.ukim.emt.booking.specification;

import finki.ukim.emt.booking.model.domain.Accommodation;
import finki.ukim.emt.booking.model.dto.FilterAccommodationDto;
import finki.ukim.emt.booking.model.enums.Category;
import org.springframework.data.jpa.domain.Specification;

public class AccommodationSpecification {

    public static Specification<Accommodation> withFilters(FilterAccommodationDto f) {
        return Specification.where(categoryEquals(f.category()))
                .and(hostEquals(f.hostId()))
                .and(hostCountryEquals(f.hostCountryId()))
                .and(numRoomsEquals(f.numRooms()))
                .and(availableEquals(f.available()));
    }

    static Specification<Accommodation> categoryEquals(Category category) {
        return (root, query, cb) ->
                category == null ? null : cb.equal(root.get("category"), category);
    }

    static Specification<Accommodation> hostEquals(Long hostId) {
        return (root, query, cb) ->
                hostId == null ? null : cb.equal(root.get("host").get("id"), hostId);
    }

    static Specification<Accommodation> hostCountryEquals(Long countryId) {
        return (root, query, cb) ->
                countryId == null ? null
                        : cb.equal(root.join("host").join("country").get("id"), countryId);
    }

    static Specification<Accommodation> numRoomsEquals(Integer numRooms) {
        return (root, query, cb) ->
                numRooms == null ? null : cb.equal(root.get("numRooms"), numRooms);
    }

    static Specification<Accommodation> availableEquals(Boolean available) {
        return (root, query, cb) ->
                available == null ? null : cb.equal(root.get("rented"), !available);
    }
}