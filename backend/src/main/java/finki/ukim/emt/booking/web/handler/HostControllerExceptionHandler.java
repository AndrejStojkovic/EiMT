package finki.ukim.emt.booking.web.handler;

import finki.ukim.emt.booking.model.exception.CountryNotFoundException;
import finki.ukim.emt.booking.web.controller.HostController;
import finki.ukim.emt.booking.web.dto.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(assignableTypes = HostController.class)
public class HostControllerExceptionHandler {
    @ExceptionHandler(CountryNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(CountryNotFoundException e) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ApiError.of(HttpStatus.NOT_FOUND, e.getMessage()));
    }
}
