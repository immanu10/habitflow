import { Module } from '@nestjs/common';
import { HabitController } from './habit.controller';
import { HabitService } from './habit.service';
import { HabitResolver } from './habit.resolver';

@Module({
  controllers: [HabitController],
  providers: [HabitResolver, HabitService],
})
export class HabitModule {}
