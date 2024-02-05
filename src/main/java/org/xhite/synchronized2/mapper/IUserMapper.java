package org.xhite.synchronized2.mapper;

import org.mapstruct.Mapper;
import org.xhite.synchronized2.dto.RegisterRequestDto;
import org.xhite.synchronized2.model.User;

@Mapper(componentModel = "spring",unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface IUserMapper {
    IUserMapper INSTANCE = org.mapstruct.factory.Mappers.getMapper(IUserMapper.class);

    User toUser(RegisterRequestDto registerRequestDto);
}
