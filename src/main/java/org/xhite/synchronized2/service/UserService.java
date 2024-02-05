package org.xhite.synchronized2.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.xhite.synchronized2.dto.LoginRequestDto;
import org.xhite.synchronized2.dto.RegisterRequestDto;
import org.xhite.synchronized2.mapper.IUserMapper;
import org.xhite.synchronized2.model.User;
import org.xhite.synchronized2.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    public final UserRepository userRepository;

    public User save(RegisterRequestDto registerRequestDto) {
        return userRepository.save(IUserMapper.INSTANCE.toUser(registerRequestDto));
    }

    public Boolean login(LoginRequestDto loginRequestDto) {
        return userRepository.findOptionalByUsernameAndPassword(loginRequestDto.getUsername(), loginRequestDto.getPassword()).isPresent();
    }

    public User findById(long l) {
        return userRepository.findById(l).orElse(null);
    }

    public Long getIdByUsername(String username) {
        return userRepository.findOptionalByUsername(username).map(User::getId).orElse(null);
    }
}
