package finki.ukim.emt.booking.service.domain;

import finki.ukim.emt.booking.model.domain.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User findByUsername(String username);

    User register(User user);

    User login(String username, String password);
}
