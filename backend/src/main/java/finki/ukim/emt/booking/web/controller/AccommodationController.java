package finki.ukim.emt.booking.web.controller;

import finki.ukim.emt.booking.model.dto.*;
import finki.ukim.emt.booking.model.projection.AccommodationDetailedSummaryProjection;
import finki.ukim.emt.booking.model.projection.AccommodationSummaryProjection;
import finki.ukim.emt.booking.service.application.AccommodationActivityLogApplicationService;
import finki.ukim.emt.booking.service.application.AccommodationApplicationService;
import finki.ukim.emt.booking.service.application.AccommodationViewApplicationService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/accommodations")
public class AccommodationController {
    private final AccommodationApplicationService accommodationApplicationService;
    private final AccommodationViewApplicationService accommodationViewApplicationService;
    private final AccommodationActivityLogApplicationService accommodationActivityLogApplicationService;

    public AccommodationController(AccommodationApplicationService accommodationApplicationService, AccommodationViewApplicationService accommodationViewApplicationService, AccommodationActivityLogApplicationService accommodationActivityLogApplicationService) {
        this.accommodationApplicationService = accommodationApplicationService;
        this.accommodationViewApplicationService = accommodationViewApplicationService;
        this.accommodationActivityLogApplicationService = accommodationActivityLogApplicationService;
    }

    @GetMapping
    public ResponseEntity<List<DisplayAccommodationDto>> findAll() {
        return ResponseEntity.ok(accommodationApplicationService.findAll());
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<DisplayAccommodationDto>> findAll(
            @ModelAttribute FilterAccommodationDto filter,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy
    ) {
        return ResponseEntity.ok(accommodationApplicationService.findAll(filter, page, size, sortBy));
    }

    @GetMapping("/summary")
    public ResponseEntity<List<AccommodationSummaryProjection>> findAllSummary() {
        return ResponseEntity.ok(accommodationApplicationService.findAllSummary());
    }

    @GetMapping("/detailed-summary")
    public ResponseEntity<List<AccommodationDetailedSummaryProjection>> findAllDetailedSummary() {
        return ResponseEntity.ok(accommodationApplicationService.findAllDetailedSummary());
    }

    @GetMapping("/rented/{rented}")
    public ResponseEntity<List<DisplayAccommodationDto>> findAllByRented(@PathVariable Boolean rented) {
        return ResponseEntity.ok(accommodationApplicationService.findAllByRented(rented));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DisplayAccommodationDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(accommodationApplicationService.findById(id));
    }

    @GetMapping("/views")
    public ResponseEntity<List<DisplayAccommodationViewDto>> findViews() {
        return ResponseEntity.ok(accommodationViewApplicationService.findAllViews());
    }

    @GetMapping("/stats")
    public ResponseEntity<List<DisplayAccommodationStatsViewDto>> findStats() {
        return ResponseEntity.ok(accommodationViewApplicationService.findAllStatsViews());
    }

    @GetMapping("/activity")
    public ResponseEntity<Page<DisplayAccommodationActivityLogDto>> findActivities(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(accommodationActivityLogApplicationService.findAll(page, size));
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
