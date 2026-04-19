package finki.ukim.emt.booking.model.exception;

public class AccommodationIsRentedException extends RuntimeException {
    public AccommodationIsRentedException(Long id) {
        super("Accommodation with id %d can not be deleted because it's being rented!");
    }
}
