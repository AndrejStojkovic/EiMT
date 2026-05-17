package finki.ukim.emt.booking.web.controller;

import finki.ukim.emt.booking.model.dto.users.RegisterUserResponseDto;
import finki.ukim.emt.booking.model.enums.Role;
import finki.ukim.emt.booking.service.application.UserApplicationService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/debug")
@Profile("dev")
public class DebugController {
    private final UserApplicationService userApplicationService;

    public DebugController(UserApplicationService userApplicationService) {
        this.userApplicationService = userApplicationService;
    }

    @GetMapping("/set-role")
    public ResponseEntity<RegisterUserResponseDto> setRole(String username, Role role) {
        return ResponseEntity.ok(userApplicationService.setUserRole(username, role));
    }

}
