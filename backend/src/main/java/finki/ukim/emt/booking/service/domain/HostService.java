package finki.ukim.emt.booking.service.domain;

import finki.ukim.emt.booking.model.domain.Host;
import finki.ukim.emt.booking.model.projection.HostSummaryProjection;

import java.util.List;

public interface HostService {
    List<Host> findAll();

    List<HostSummaryProjection> findAllSummaryProjections();

    Host findById(Long id);

    Host create(Host host);

    Host update(Long id, Host host);

    Host delete(Long id);
}
