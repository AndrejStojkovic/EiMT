package finki.ukim.emt.booking.service.application.impl;

import finki.ukim.emt.booking.helpers.JwtHelper;
import finki.ukim.emt.booking.model.domain.User;
import finki.ukim.emt.booking.model.dto.users.LoginUserRequestDto;
import finki.ukim.emt.booking.model.dto.users.LoginUserResponseDto;
import finki.ukim.emt.booking.model.dto.users.RegisterUserRequestDto;
import finki.ukim.emt.booking.model.dto.users.RegisterUserResponseDto;
import finki.ukim.emt.booking.model.enums.Role;
import finki.ukim.emt.booking.service.application.UserApplicationService;
import finki.ukim.emt.booking.service.domain.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserApplicationServiceImpl implements UserApplicationService {
    private final UserService userService;
    private final JwtHelper jwtHelper;

    public UserApplicationServiceImpl(UserService userService, JwtHelper jwtHelper) {
        this.userService = userService;
        this.jwtHelper = jwtHelper;
    }

    @Override
    public List<RegisterUserResponseDto> findAll() {
        return userService.findAll()
                .stream().map(RegisterUserResponseDto::from).toList();
    }

    @Override
    public RegisterUserResponseDto register(RegisterUserRequestDto registerUserRequestDto) {
        User user = userService.register(registerUserRequestDto.toUser());
        return RegisterUserResponseDto.from(user);
    }

    @Override
    public LoginUserResponseDto login(LoginUserRequestDto loginUserRequestDto) {
        User user = userService.login(loginUserRequestDto.username(), loginUserRequestDto.password());
        String token = jwtHelper.generateToken(user);
        return new LoginUserResponseDto(token);
    }

    @Override
    public RegisterUserResponseDto findByUsername(String username) {
        User user = userService.findByUsername(username);
        return RegisterUserResponseDto.from(user);
    }

    @Override
    public RegisterUserResponseDto setUserRole(String username, Role role) {
        User user = userService.setUserRole(username, role);
        return RegisterUserResponseDto.from(user);
    }

    @Override
    public RegisterUserResponseDto update(RegisterUserResponseDto user) {
        return RegisterUserResponseDto.from(userService.update(
                user.username(),
                user.name(),
                user.surname(),
                user.email(),
                user.role()
        ));
    }

    @Override
    public RegisterUserResponseDto delete(String username) {
        return RegisterUserResponseDto.from(userService.delete(username));
    }
}
