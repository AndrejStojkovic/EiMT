package finki.ukim.emt.booking.service.domain;

import finki.ukim.emt.booking.model.views.AccommodationStatsView;

import java.util.List;

public interface AccommodationStatsViewService {
    List<AccommodationStatsView> findAll();
}
