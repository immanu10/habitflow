import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EditHabitDto, HabitDto } from './dto';
import { HabitService } from './habit.service';
import { JwtGaurd } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtGaurd)
@Controller('habit')
export class HabitController {
  constructor(private habitService: HabitService) {}
  @Post('new')
  create(@Body() dto: HabitDto, @GetUser() user: User) {
    const id = user.id;
    return this.habitService.create(dto, id);
  }
  @Get()
  getHabits(@GetUser() user: User) {
    const id = user.id;
    return this.habitService.getHabits(id);
  }
  @Get(':id')
  getHabitByID(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.habitService.getHabitByID(id, user.id);
  }

  @Patch(':id')
  editHabitById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
    @Body() dto: EditHabitDto,
  ) {
    return this.habitService.editHabitById(id, user.id, dto);
  }

  @Delete(':id')
  deleteHabitById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.habitService.deleteHabitById(id, user.id);
  }
}
