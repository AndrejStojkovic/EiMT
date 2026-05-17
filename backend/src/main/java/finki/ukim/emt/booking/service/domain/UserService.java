package finki.ukim.emt.booking.service.domain;

import finki.ukim.emt.booking.model.domain.User;
import finki.ukim.emt.booking.model.enums.Role;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User findByUsername(String username);

    User register(User user);

    User login(String username, String password);

    User setUserRole(String username, Role role);
}
