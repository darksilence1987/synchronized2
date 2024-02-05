package org.xhite.synchronized2.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.xhite.synchronized2.dto.PostRequestDto;
import org.xhite.synchronized2.dto.PostResponseDto;
import org.xhite.synchronized2.mapper.IPostMapper;
import org.xhite.synchronized2.model.Post;
import org.xhite.synchronized2.service.PostService;
import org.xhite.synchronized2.service.SessionService;
import org.xhite.synchronized2.service.UserService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PostController {
    private final PostService postService;
    private final SessionService sessionService;
    private final UserService userService;

    @GetMapping("/getAll")
    public ResponseEntity<List<PostResponseDto>> getAll() {
        List<PostResponseDto> postResponse = new ArrayList<>();
        postService.findAll().forEach(post -> {
            postResponse.add(IPostMapper.INSTANCE.toPostResponseDto(post, userService.findById(post.getOwnerId()).getUsername()));
        });
        return ResponseEntity.ok(postResponse);
    }
    @PostMapping("/create")
    public ResponseEntity<Post> create(@RequestBody PostRequestDto dto) {
        Post post = new Post();
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setOwnerId(sessionService.getUserIdBySessionId(dto.getSessionId()));
        return ResponseEntity.ok(postService.save(post));

    }
}
