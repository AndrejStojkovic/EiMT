package finki.ukim.emt.booking.service.domain.impl;

import finki.ukim.emt.booking.model.domain.Host;
import finki.ukim.emt.booking.repository.HostRepository;
import finki.ukim.emt.booking.service.domain.HostService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HostServiceImpl implements HostService {
    private final HostRepository hostRepository;

    public HostServiceImpl(HostRepository hostRepository) {
        this.hostRepository = hostRepository;
    }

    @Override
    public List<Host> findAll() {
        return hostRepository.findAll();
    }

    @Override
    public Optional<Host> findById(Long id) {
        return hostRepository.findById(id);
    }

    @Override
    public Host create(Host host) {
        return hostRepository.save(host);
    }

    @Override
    public Optional<Host> update(Long id, Host host) {
        return hostRepository
                .findById(id)
                .map((existingHost) -> {
                    existingHost.setName(host.getName());
                    existingHost.setSurname(host.getSurname());
                    existingHost.setCountry(host.getCountry());
                    return hostRepository.save(existingHost);
                });
    }

    @Override
    public Optional<Host> delete(Long id) {
        Optional<Host> host = hostRepository.findById(id);
        host.ifPresent(hostRepository::delete);
        return host;
    }
}
