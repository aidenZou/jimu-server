import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateUserDto } from './auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(param: ValidateUserDto): Promise<any> {
    const user = await this.authService.validateUser({
      identifier: param.identifier,
    });
    // console.log('user xxxxx :>> ', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
