package org.xhite.synchronized2.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.xhite.synchronized2.dto.LoginRequestDto;
import org.xhite.synchronized2.dto.RegisterRequestDto;
import org.xhite.synchronized2.model.User;
import org.xhite.synchronized2.service.SessionService;
import org.xhite.synchronized2.service.UserService;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;
    private final SessionService sessionService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequestDto registerRequestDto) {
        return ResponseEntity.ok(userService.save(registerRequestDto));

    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDto loginRequestDto) {
        if(userService.login(loginRequestDto)){
            String sessionId = UUID.randomUUID().toString();
            Long userId = userService.getIdByUsername(loginRequestDto.getUsername());
            sessionService.createSession(sessionId, userId);
            return ResponseEntity.ok(sessionId);
        }
        return ResponseEntity.status(401).body("Login Failed");
    }
    @GetMapping("/profile")
    public ResponseEntity<User> profile(@RequestParam String sessionId) {
        Long userId = sessionService.getUserIdBySessionId(sessionId);
        return ResponseEntity.ok(userService.findById(userId));
    }

    @GetMapping("/getuser")
    public ResponseEntity<User> getUser(@RequestParam String userId) {
        return ResponseEntity.ok(userService.findById(Long.parseLong(userId)));
    }
}
