import { ForbiddenException, Injectable } from '@nestjs/common';
import { EditHabitDto, HabitDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HabitCreate } from './habit.model';

@Injectable()
export class HabitService {
  constructor(private prisma: PrismaService) {}
  async create(dto: HabitDto | HabitCreate, userId: number) {
    const habit = await this.prisma.habit.create({
      data: {
        userId: userId,
        ...dto,
      },
    });
    return habit;
  }
  async getHabits(userId: number) {
    const habits = await this.prisma.habit.findMany({
      where: {
        userId,
      },
    });
    return habits;
  }
  async getHabitByID(id: number, userId: number) {
    const habits = await this.prisma.habit.findFirst({
      where: {
        id,
        userId,
      },
    });
    return habits;
  }
  async editHabitById(id: number, userId: number, dto: EditHabitDto) {
    const habit = await this.prisma.habit.findUnique({
      where: {
        id,
      },
    });
    if (!habit || habit.userId !== userId)
      throw new ForbiddenException('Access to resource Denied');

    const editedHabit = await this.prisma.habit.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
    return editedHabit;
  }
  async deleteHabitById(id: number, userId: number) {
    const habit = await this.prisma.habit.findUnique({
      where: {
        id,
      },
    });
    if (!habit || habit.userId !== userId)
      throw new ForbiddenException('Access to resour Denied');

    const deletedHabit = await this.prisma.habit.delete({
      where: {
        id,
      },
    });
    return deletedHabit;
  }
}
