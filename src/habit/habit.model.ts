import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Habit as HabitClient } from '@prisma/client';

@ObjectType()
export class Habit implements HabitClient {
  @Field(() => Int)
  id: number;

  @Field(() => String, {
    nullable: false,
    description: 'Habit title',
  })
  title: string;

  @Field(() => String, {
    nullable: true,
    description: 'Habit description',
  })
  description: string;

  @Field(() => Boolean, {
    defaultValue: false,
  })
  isCompleted: boolean;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;

  @Field(() => Int)
  userId: number;
}

@InputType()
export class HabitCreate {
  @Field(() => String, {
    nullable: false,
    description: 'Habit title',
  })
  title: string;

  @Field(() => String, {
    nullable: true,
    description: 'Habit Description',
  })
  description?: string;
}

@InputType()
export class HabitEdit {
  @Field(() => String, {
    nullable: false,
    description: 'Habit title',
  })
  title?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Habit Description',
  })
  description?: string;
}
