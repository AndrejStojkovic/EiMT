package finki.ukim.emt.booking.web.controller;

import finki.ukim.emt.booking.model.dto.CreateAccommodationDto;
import finki.ukim.emt.booking.model.dto.DisplayAccommodationDto;
import finki.ukim.emt.booking.service.application.AccommodationApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/accommodations")
public class AccommodationController {
    private final AccommodationApplicationService accommodationApplicationService;

    public AccommodationController(AccommodationApplicationService accommodationApplicationService) {
        this.accommodationApplicationService = accommodationApplicationService;
    }

    @GetMapping
    public ResponseEntity<List<DisplayAccommodationDto>> findAll() {
        return ResponseEntity.ok(accommodationApplicationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DisplayAccommodationDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(accommodationApplicationService.findById(id));
    }

    @PostMapping("/add")
    public ResponseEntity<DisplayAccommodationDto> create(@RequestBody @Valid CreateAccommodationDto createAccommodationDto) {
        return ResponseEntity.ok(accommodationApplicationService.create(createAccommodationDto));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<DisplayAccommodationDto> update(
            @PathVariable Long id,
            @RequestBody @Valid CreateAccommodationDto createAccommodationDto) {
        return ResponseEntity.ok(accommodationApplicationService.update(id, createAccommodationDto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<DisplayAccommodationDto> delete(@PathVariable Long id) {
        return ResponseEntity.ok(accommodationApplicationService.delete(id));
    }

    @PostMapping("/rent/{id}")
    public ResponseEntity<DisplayAccommodationDto> rent(@PathVariable Long id) {
        return ResponseEntity.ok(accommodationApplicationService.rent(id));
    }
}
