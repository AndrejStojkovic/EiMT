package finki.ukim.emt.booking.service.application;

import finki.ukim.emt.booking.model.dto.CreateHostDto;
import finki.ukim.emt.booking.model.dto.DisplayHostDto;
import finki.ukim.emt.booking.model.projection.HostSummaryProjection;

import java.util.List;

public interface HostApplicationService {
    List<DisplayHostDto> findAll();

    List<HostSummaryProjection> findAllSummaryProjections();

    DisplayHostDto findById(Long id);

    DisplayHostDto create(CreateHostDto createHostDto);

    DisplayHostDto update(Long id, CreateHostDto createHostDto);

    DisplayHostDto delete(Long id);
}
