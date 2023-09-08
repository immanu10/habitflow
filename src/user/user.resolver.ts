import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUserGraphql } from 'src/auth/decorator';
import { GraphqlAuthGuard } from 'src/auth/guard';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserEdit } from './user.model';
import { EditUserDto } from './dto';

@UseGuards(GraphqlAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private userServer: UserService) {}

  @Query(() => User)
  getMe(@GetUserGraphql() user: User) {
    return user;
  }

  @Mutation(() => User)
  async editUser(
    @Args({ name: 'input', type: () => UserEdit })
    editUser: EditUserDto,
    @GetUserGraphql() user: User,
  ): Promise<User> {
    return this.userServer.editUser(user.id, editUser);
  }
}
