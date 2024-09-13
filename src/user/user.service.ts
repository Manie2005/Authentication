import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entity/user.entity";
import { CreateUserDto } from "src/dto/create.dto";
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing

@Injectable()
export class UsersService {
  // Constructor with injected User repository
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Method to create a new user (with hashed password)
  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds); // Hash password
    const createUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword, // Save the hashed password
    });
    return this.userRepository.save(createUser); // Save the user to the database
  }

  // Method to find a user by username (used in AuthService)
  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  // Method to find a single user by their username (can be reused)
  async findOneUser(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}