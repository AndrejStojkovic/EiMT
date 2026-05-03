package finki.ukim.emt.booking.model.dto.users;

import finki.ukim.emt.booking.model.domain.User;

public record RegisterUserRequestDto(
        String username,
        String password,
        String name,
        String surname,
        String email
) {
    public User toUser() {
        return new User(username, password, name, surname, email);
    }
}
