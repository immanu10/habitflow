import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { User as UserClient } from '@prisma/client';

@ObjectType()
export class User implements UserClient {
  @Field(() => Int)
  id: number;

  @Field(() => String, {
    nullable: false,
    description: 'User email',
  })
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String, {
    nullable: true,
    description: 'User Name',
  })
  name: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

@InputType()
export class UserEdit {
  @Field(() => String, {
    nullable: true,
  })
  email?: string;

  @Field(() => String, {
    nullable: true,
    description: 'User Name',
  })
  name?: string;
}
