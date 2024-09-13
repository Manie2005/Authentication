import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Get, Req } from '@nestjs/common'; // Corrected imports
import { AuthService } from './authentication.service'; // Import AuthService
import { UsersService } from 'src/user/user.service'; // Import UsersService for handling user-related operations
import { LoginDto } from 'src/dto/login.dto'; // Import DTO for login
import { CreateUserDto } from 'src/dto/create.dto'; // Import DTO for creating users
import { AuthGuard } from '@nestjs/passport'; // Import AuthGuard
import { Request } from 'express'; // Import Request type from Express

@Controller('authentication')
export class AuthenticationController {
  // Injecting AuthService and UsersService in the constructor
  constructor(
    private readonly authService: AuthService, 
    private readonly usersService: UsersService
  ) {}

  // Login endpoint
  @HttpCode(HttpStatus.OK) // Set HTTP response status to 200 OK
  @Post('login') // Define POST request for '/login'
  signin(@Body() loginDto: LoginDto) {
    // Call AuthService's signIn method, passing the username and password
    return this.authService.signIn(loginDto.username, loginDto.password);
  }

  // Signup endpoint
  @Post('signup') // Define POST request for '/signup'
  signup(@Body() createUserDto: CreateUserDto) {
    // Call UsersService's create method to create a new user
    return this.usersService.create(createUserDto);
  }

  // Protected route for getting the user profile
  @UseGuards(AuthGuard('jwt')) // Apply JWT authentication guard for protecting the route
  @Get('profile') // Define GET request for '/profile'
  getProfile(@Req() req: Request) { // Corrected @Request to @Req and imported the Request type
    // Return the authenticated user's information from the request object
    return req.user;
  }
}
