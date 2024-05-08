import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './common/auth/authentication/local-auth.guards';
import { User } from './common/users/user.entity';
import { UsersService } from './common/users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  async signup(@Res() response, @Body() user: User) {
    const newUser = await this.userService.signup(user);
    return response.status(HttpStatus.CREATED).json({ newUser });
  }

  @Post('/signin')
  async signin(@Res() response, @Body() user: User) {
    const token = await this.userService.signin(user, this.jwtService);
    return response.status(HttpStatus.OK).json(token);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/local-login')
  async localLogin(@Request() req) {
    return req.user;
  }
}
