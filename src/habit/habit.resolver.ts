import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HabitService } from './habit.service';
import { Habit, HabitCreate, HabitEdit } from './habit.model';
import { GetUserGraphql } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { GraphqlAuthGuard } from 'src/auth/guard';
import { UseGuards } from '@nestjs/common';
import { HabitDto } from './dto';

@UseGuards(GraphqlAuthGuard)
@Resolver(() => Habit)
export class HabitResolver {
  constructor(private habitService: HabitService) {}

  @Query(() => [Habit])
  getHabits(@GetUserGraphql() user: User) {
    const id = user.id;

    return this.habitService.getHabits(id);
  }
  @Query(() => Habit)
  getHabitByID(
    @Args('id', { type: () => Int }) id: number,
    @GetUserGraphql() user: User,
  ) {
    return this.habitService.getHabitByID(id, user.id);
  }

  @Mutation(() => Habit)
  async create(
    @Args({ name: 'input', type: () => HabitCreate }) habit: HabitDto,
    @GetUserGraphql() user: User,
  ): Promise<Habit> {
    return this.habitService.create(habit, user.id);
  }

  @Mutation(() => Habit)
  async editHabitById(
    @Args({ name: 'input', type: () => HabitEdit }) habit: HabitDto,
    @Args('id', { type: () => Int }) id: number,
    @GetUserGraphql() user: User,
  ): Promise<Habit> {
    return this.habitService.editHabitById(id, user.id, habit);
  }

  @Mutation(() => Habit)
  async deleteHabitById(
    @Args('id', { type: () => Int }) id: number,
    @GetUserGraphql() user: User,
  ): Promise<Habit> {
    return this.habitService.deleteHabitById(id, user.id);
  }
}
