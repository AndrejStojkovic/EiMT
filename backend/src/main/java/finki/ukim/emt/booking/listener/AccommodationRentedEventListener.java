package finki.ukim.emt.booking.listener;

import finki.ukim.emt.booking.event.AccommodationRentedEvent;
import finki.ukim.emt.booking.model.domain.Accommodation;
import finki.ukim.emt.booking.model.domain.AccommodationActivityLog;
import finki.ukim.emt.booking.model.enums.AccommodationEventType;
import finki.ukim.emt.booking.repository.AccommodationActivityLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@Slf4j
public class AccommodationRentedEventListener {
    private final AccommodationActivityLogRepository accommodationActivityLogRepository;

    public AccommodationRentedEventListener(AccommodationActivityLogRepository accommodationActivityLogRepository) {
        this.accommodationActivityLogRepository = accommodationActivityLogRepository;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Async
    public void onAccommodationRentedEvent(AccommodationRentedEvent event) {
        Accommodation accommodation = event.accommodation();

        if(accommodation == null) {
            return;
        }

        log.info("[ASYNC - thread: {}] Accommodation rented '{}'.",
                Thread.currentThread().getName(),
                accommodation);

        if(accommodation.getRented())
        {
            log.warn("[ASYNC - thread: {}] Accommodation '{}' has no free rooms!",
                    Thread.currentThread().getName(),
                    accommodation);
        }

        accommodationActivityLogRepository.save(new AccommodationActivityLog(
                accommodation.getId(),
                accommodation.getName(),
                AccommodationEventType.ACCOMMODATION_RENTED
        ));
    }
}
