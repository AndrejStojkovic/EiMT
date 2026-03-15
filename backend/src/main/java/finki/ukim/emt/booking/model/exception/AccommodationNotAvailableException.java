package finki.ukim.emt.booking.model.exception;

public class AccommodationNotAvailableException extends RuntimeException {
    public AccommodationNotAvailableException(Long id) {
        super(String.format("Accommodation with id %d is already rented!", id));
    }
}
