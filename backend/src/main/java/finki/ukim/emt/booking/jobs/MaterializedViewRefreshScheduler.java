package finki.ukim.emt.booking.jobs;

import finki.ukim.emt.booking.repository.AccommodationStatsViewRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class MaterializedViewRefreshScheduler {
    private final AccommodationStatsViewRepository accommodationStatsViewRepository;

    MaterializedViewRefreshScheduler(AccommodationStatsViewRepository accommodationStatsViewRepository) {
        this.accommodationStatsViewRepository = accommodationStatsViewRepository;
    }

    @Scheduled(cron = "0 * * * * *")
    @Transactional
    public void refreshAccommodationStatsView() {
        accommodationStatsViewRepository.refresh();
    }
}
