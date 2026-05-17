package finki.ukim.emt.booking.config;

import finki.ukim.emt.booking.model.domain.User;
import finki.ukim.emt.booking.model.enums.Role;
import finki.ukim.emt.booking.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class StartupRunner implements ApplicationRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public StartupRunner(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if(!userRepository.existsByUsername("admin")) {
            User user = new User(
                    "admin",
                    passwordEncoder.encode("admin"),
                    "Admin",
                    "Adminkovski",
                    "admin@finki.mk"
            );
            user.setRole(Role.ROLE_ADMINISTRATOR);
            userRepository.save(user);
            System.out.println("[AUTH] Created admin user with ROLE_ADMINISTRATOR.");
        } else {
            System.out.println("[AUTH] Admin user already exists, skipping creation...");
        }
    }
}
