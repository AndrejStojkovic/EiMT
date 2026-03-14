package finki.ukim.emt.booking.model.exception;

public class HostNotFoundException extends RuntimeException {
    public HostNotFoundException(Long id) {
        super(String.format("Host with id %s was not found!", id));
    }
}
