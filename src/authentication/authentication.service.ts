import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, // Inject UsersService
    private readonly jwtService: JwtService, // Inject JwtService
  ) {}

  // Method to validate the user
  async validateUser(username: string, password: string): Promise<any> {
    // Find the user by username
    const user = await this.usersService.findByUsername(username);
    
    // If user exists, compare the password using bcrypt
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user; // Exclude password from the result
      return result;
    }
    return null; // If user is not found or password is incorrect
  }

  // Method to log the user in (signIn)
  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.validateUser(username, pass);
    
    // If the user is valid, generate a JWT token
    if (user) {
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload), // Sign the token using JWT
      };
    }
    throw new Error('Invalid credentials'); // Throw an error if credentials are invalid
  }
}