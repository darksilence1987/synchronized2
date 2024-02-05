package org.xhite.synchronized2.repository;

import io.micrometer.observation.ObservationFilter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.xhite.synchronized2.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findOptionalByUsernameAndPassword(String username, String password);

    Optional<User> findOptionalByUsername(String username);
}
