import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(user: CreateUserDto): Promise<any> {
    const oldUser = await this.userService.findOneByParams({
      username: user.username,
    });
    if (oldUser?.password !== user.password) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return this.createToken(oldUser);
  }

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.findOneByParams({
      username: createUserDto.username,
    });
    if (user) {
      throw new ConflictException('User already exists!');
    }
    const newUser = await this.userService.create(
      createUserDto as CreateUserDto,
    );
    return this.createToken(newUser);
  }

  async createToken(user: any) {
    const { _id, role, username } = user;
    return {
      access_token: await this.jwtService.signAsync({
        _id,
        role,
        username,
      }),
    };
  }
}
