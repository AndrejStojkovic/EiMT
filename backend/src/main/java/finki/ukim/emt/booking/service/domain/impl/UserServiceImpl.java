package finki.ukim.emt.booking.service.domain.impl;

import finki.ukim.emt.booking.model.domain.User;
import finki.ukim.emt.booking.model.exception.IncorrectPasswordException;
import finki.ukim.emt.booking.model.exception.UserAlreadyExistsException;
import finki.ukim.emt.booking.model.exception.UserNotFoundException;
import finki.ukim.emt.booking.repository.UserRepository;
import finki.ukim.emt.booking.service.domain.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User findByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException(username);
        }
        return user;
    }

    @Override
    public User register(User user) {
        boolean usernameExists = userRepository.existsByUsername(user.getUsername());
        if(usernameExists) {
            throw new UserAlreadyExistsException(user.getUsername());
        }
        return userRepository.save(new User(
                user.getUsername(),
                passwordEncoder.encode(user.getPassword()),
                user.getName(),
                user.getSurname(),
                user.getEmail()
        ));
    }

    @Override
    public User login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if(user == null) {
            throw new UserNotFoundException(username);
        }
        if(!passwordEncoder.matches(password, user.getPassword())) {
            throw new IncorrectPasswordException();
        }
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException(username);
        }
        return user;
    }
}
