// auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './authentication.service'; // Import AuthService
import { AuthenticationController } from './authentication.controller'; // Import AuthenticationController
import { UsersService } from '../user/user.service'; // Import UsersService
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy/jwt-strategy.service'; // Import JwtStrategy
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity'; // Import User entity
import { LocalStrategy } from './local.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Register User entity for TypeORM
    JwtModule.register({ secret: 'JWT_SECRET', signOptions: { expiresIn: '1h' } }), // JWT setup
  ],
  controllers: [AuthenticationController], // Register the controller
  providers: [AuthService, UsersService, JwtStrategy,LocalStrategy], // Register services (AuthService, UsersService)
  exports: [AuthService], // Export AuthService so other modules can use it
})
export class AuthModule {}