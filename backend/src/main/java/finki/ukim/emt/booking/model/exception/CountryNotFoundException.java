package finki.ukim.emt.booking.model.exception;

public class CountryNotFoundException extends RuntimeException {
    public CountryNotFoundException(Long id) {
        super(String.format("Country with id %s was not found!", id));
    }
}
