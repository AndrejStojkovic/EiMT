package finki.ukim.emt.booking.service.domain;

import finki.ukim.emt.booking.model.domain.User;
import finki.ukim.emt.booking.model.enums.Role;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> findAll();

    User findByUsername(String username);

    User register(User user);

    User login(String username, String password);

    User setUserRole(String username, Role role);

    User update(String username, String name, String surname, String email, Role role);

    User delete(String username);
}
