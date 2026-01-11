package com.moneymanager.backend.service;

import com.moneymanager.backend.dto.AuthRequest;
import com.moneymanager.backend.dto.AuthResponse;
import com.moneymanager.backend.dto.RegisterRequest;
import com.moneymanager.backend.model.User;
import com.moneymanager.backend.repository.UserRepository;
import com.moneymanager.backend.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest req) {
        Optional<User> exists = userRepository.findByEmail(req.getEmail());
        if (exists.isPresent()) throw new RuntimeException("Email taken");
        User u = new User();
        u.setName(req.getName());
        u.setEmail(req.getEmail());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        userRepository.save(u);
        String token = jwtUtil.generateToken(u.getEmail());
        return new AuthResponse(token);
    }

    public AuthResponse login(AuthRequest req) {
        User u = userRepository.findByEmail(req.getEmail()).orElseThrow(() -> new RuntimeException("Invalid creds"));
        if (!passwordEncoder.matches(req.getPassword(), u.getPassword())) throw new RuntimeException("Invalid creds");
        return new AuthResponse(jwtUtil.generateToken(u.getEmail()));
    }
}
