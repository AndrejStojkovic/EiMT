package finki.ukim.emt.booking.web.controller;

import finki.ukim.emt.booking.model.domain.User;
import finki.ukim.emt.booking.model.dto.users.LoginUserRequestDto;
import finki.ukim.emt.booking.model.dto.users.LoginUserResponseDto;
import finki.ukim.emt.booking.model.dto.users.RegisterUserRequestDto;
import finki.ukim.emt.booking.model.dto.users.RegisterUserResponseDto;
import finki.ukim.emt.booking.service.application.UserApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserApplicationService userApplicationService;

    public UserController(UserApplicationService userApplicationService) {
        this.userApplicationService = userApplicationService;
    }

    @GetMapping("/{username}")
    public ResponseEntity<RegisterUserResponseDto> findByUsername(@PathVariable String username) {
        RegisterUserResponseDto user = userApplicationService.findByUsername(username);
        if(user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/me")
    public ResponseEntity<RegisterUserResponseDto> me(@AuthenticationPrincipal User user) {
        RegisterUserResponseDto me = userApplicationService.findByUsername(user.getUsername());
        return ResponseEntity.ok(me);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponseDto> register(@RequestBody RegisterUserRequestDto registerUserRequestDto) {
        RegisterUserResponseDto registerUserResponseDto = userApplicationService.register(registerUserRequestDto);
        if(registerUserResponseDto == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(registerUserResponseDto);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginUserResponseDto> login(@RequestBody LoginUserRequestDto loginUserRequestDto) {
        LoginUserResponseDto loginUserResponseDto = userApplicationService.login(loginUserRequestDto);
        if(loginUserResponseDto == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(loginUserResponseDto);
    }
}
