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

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserApplicationService userApplicationService;

    public UserController(UserApplicationService userApplicationService) {
        this.userApplicationService = userApplicationService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<RegisterUserResponseDto>> findAll() {
        return ResponseEntity.ok(userApplicationService.findAll());
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

    @PutMapping("/edit/{username}")
    public ResponseEntity<RegisterUserResponseDto> edit(
            @PathVariable String username,
            @RequestBody RegisterUserResponseDto registerUserResponseDto) {
        if(registerUserResponseDto == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userApplicationService.update(registerUserResponseDto));
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<RegisterUserResponseDto> delete(@PathVariable String username) {
        return ResponseEntity.ok(userApplicationService.delete(username));
    }
}
