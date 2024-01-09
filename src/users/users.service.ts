import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOneById(id);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async validateUser(email: string, password: string): Promise<User | undefined> {
    const user = await this.findByEmail(email);

    if (user && (await this.validatePassword(user, password))) {
      return user;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async create(email: string, password: string): Promise<User> {
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ email, password: hashedPassword });

    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(id: number, updates: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // You can customize the allowed updates based on your requirements
    if (updates.email) {
      user.email = updates.email;
    }

    if (updates.password) {
      user.password = await bcrypt.hash(updates.password, 10);
    }

    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);
  }
}
