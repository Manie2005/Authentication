import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Correctly importing ConfigModule and ConfigService
import { UsersModule } from './user/user.module'; // Importing custom UsersModule
import { AuthModule } from './authentication/authentication.module'; // Importing custom AuthModule
import { AppController } from './app.controller'; // App controller
import { AppService } from './app.service'; // App service
import { AuthenticationController } from './authentication/authentication.controller'; // Authentication controller
import { JwtStrategy } from './authentication/jwt-strategy/jwt-strategy.service'; // JWT strategy
import * as dotenv from 'dotenv'; // Importing dotenv to use environment variables

// Load environment variables from .env file
dotenv.config();

@Module({
  imports: [
    // Configuration Module: Loads .env configuration and makes it globally available
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule globally available without importing into every module
    }),

    // TypeORM Module: Configures TypeORM asynchronously, fetching DB config from the environment
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Ensure ConfigModule is imported to use ConfigService
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Database type (e.g., postgres, mysql, etc.)
        host: configService.get('HOST'), // Fetching HOST from environment via ConfigService
        port: Number(configService.get('PORT')), // Fetching PORT from environment and converting to a number
        username: 'postgres', // Hardcoded database username
        password: configService.get('PASSWORD'), // Fetching PASSWORD from environment
        database: 'Authentication', // Hardcoded database name
        autoLoadEntities: true, // Automatically load entities from modules
        synchronize: true, // Synchronize schema with the database (use carefully in production)
      }),
      inject: [ConfigService], // Injecting ConfigService to access environment variables
    }),

    // Importing Users and Auth modules
    UsersModule, // Custom module for handling user-related operations
    AuthModule, // Custom module for handling authentication-related operations
  ],
  
  // List of providers (services)
  providers: [AppService, ConfigService, JwtStrategy], // Including ConfigService and JWT strategy as providers

  // Controllers to handle incoming HTTP requests
  controllers: [AppController, AuthenticationController], // App and Authentication controllers
})
export class AppModule {}
