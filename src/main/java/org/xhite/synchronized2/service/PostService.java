package org.xhite.synchronized2.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.xhite.synchronized2.dto.PostRequestDto;
import org.xhite.synchronized2.mapper.IPostMapper;
import org.xhite.synchronized2.model.Post;
import org.xhite.synchronized2.model.User;
import org.xhite.synchronized2.repository.PostRepository;
import org.xhite.synchronized2.repository.UserRepository;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    public List<Post> findAll() {
        return postRepository.findAll();
    }

    public Post save(Post post) {
        post.setTimestamp(new Date());
        return postRepository.save(post);
    }
}
