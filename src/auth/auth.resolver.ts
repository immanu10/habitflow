import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { Auth, AuthResult } from './auth.model';
import { AuthDto } from './dto';

@Resolver(() => AuthResult)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResult)
  async signup(
    @Args({ name: 'input', type: () => Auth }) credentials: AuthDto,
  ): Promise<{
    access_token: string;
  }> {
    return this.authService.signup(credentials);
  }

  @Mutation(() => AuthResult)
  async signin(
    @Args({ name: 'input', type: () => Auth }) credentials: AuthDto,
  ): Promise<{
    access_token: string;
  }> {
    return this.authService.signin(credentials);
  }
}
