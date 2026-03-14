package finki.ukim.emt.booking.web.handler;

import finki.ukim.emt.booking.model.exception.HostNotFoundException;
import finki.ukim.emt.booking.web.controller.AccommodationController;
import finki.ukim.emt.booking.web.dto.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(assignableTypes = AccommodationController.class)
public class AccommodationControllerExceptionHandler {
    @ExceptionHandler(HostNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(HostNotFoundException e) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ApiError.of(HttpStatus.NOT_FOUND, e.getMessage()));
    }
}
