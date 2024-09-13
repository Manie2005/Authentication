
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { User } from 'src/entity/user.entity';

@Module({
  providers: [UsersService],
  imports:[TypeOrmModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}