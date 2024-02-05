package org.xhite.synchronized2.mapper;

import org.mapstruct.Mapper;
import org.xhite.synchronized2.dto.PostRequestDto;
import org.xhite.synchronized2.dto.PostResponseDto;
import org.xhite.synchronized2.model.Post;
import org.xhite.synchronized2.model.User;

@Mapper(componentModel = "spring", unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface IPostMapper {
    IPostMapper INSTANCE = org.mapstruct.factory.Mappers.getMapper(IPostMapper.class);
    Post toPost(PostRequestDto postRequestDto);
    PostResponseDto toPostResponseDto(Post post, String username);
}
