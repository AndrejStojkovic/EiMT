package finki.ukim.emt.booking.service.domain;


import finki.ukim.emt.booking.model.views.AccommodationView;

import java.util.List;

public interface AccommodationViewService {
    List<AccommodationView> findAll();
}
