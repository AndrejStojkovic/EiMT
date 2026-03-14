package finki.ukim.emt.booking.model.exception;

public class AccommodationNotFoundException extends RuntimeException {
    public AccommodationNotFoundException(Long id) {
        super(String.format("Accommodation with id %s was not found!", id));
    }
}
