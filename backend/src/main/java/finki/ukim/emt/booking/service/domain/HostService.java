package finki.ukim.emt.booking.service.domain;

import finki.ukim.emt.booking.model.domain.Host;

import java.util.List;
import java.util.Optional;

public interface HostService {
    List<Host> findAll();

    Optional<Host> findById(Long id);

    Host create(Host host);

    Optional<Host> update(Long id, Host host);

    Optional<Host> delete(Long id);
}
