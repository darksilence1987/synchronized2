package org.xhite.synchronized2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.xhite.synchronized2.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
