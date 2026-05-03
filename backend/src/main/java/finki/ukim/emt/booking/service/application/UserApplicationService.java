package finki.ukim.emt.booking.service.application;

import finki.ukim.emt.booking.model.dto.users.LoginUserRequestDto;
import finki.ukim.emt.booking.model.dto.users.LoginUserResponseDto;
import finki.ukim.emt.booking.model.dto.users.RegisterUserRequestDto;
import finki.ukim.emt.booking.model.dto.users.RegisterUserResponseDto;

public interface UserApplicationService {
    RegisterUserResponseDto register(RegisterUserRequestDto registerUserRequestDto);

    LoginUserResponseDto login(LoginUserRequestDto loginUserRequestDto);

    RegisterUserResponseDto findByUsername(String username);
}
