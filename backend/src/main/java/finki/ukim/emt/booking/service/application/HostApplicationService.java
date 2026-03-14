package finki.ukim.emt.booking.service.application;

import finki.ukim.emt.booking.model.dto.CreateHostDto;
import finki.ukim.emt.booking.model.dto.DisplayHostDto;

import java.util.List;
import java.util.Optional;

public interface HostApplicationService {
    List<DisplayHostDto> findAll();

    Optional<DisplayHostDto> findById(Long id);

    DisplayHostDto create(CreateHostDto createHostDto);

    Optional<DisplayHostDto> update(Long id, CreateHostDto createHostDto);

    Optional<DisplayHostDto> delete(Long id);
}
