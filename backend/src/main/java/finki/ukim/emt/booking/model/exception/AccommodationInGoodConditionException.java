package finki.ukim.emt.booking.model.exception;

public class AccommodationInGoodConditionException extends RuntimeException {
    public AccommodationInGoodConditionException(Long id) {
        super(String.format("Accommodation with id %d can not be deleted due to not being in a BAD condition!", id));
    }
}
