import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class Auth {
  @Field(() => String, {
    nullable: false,
  })
  email: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class AuthResult {
  @Field(() => String)
  access_token: string;
}
