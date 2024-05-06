import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './common/auth/authentication/local-auth.guards';

@Controller()
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
