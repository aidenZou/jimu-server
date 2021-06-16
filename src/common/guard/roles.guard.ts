import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject('AuthService') private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // console.log("RolesGuard :>> ");
    const request = context.getArgByIndex(0);
    const user = request.user;
    const route = request.route;
    const method = Object.keys(route.methods)[0];
    const router = `${method}-${route.path}`;
    // console.log("route :", method, route.path, router);
    // console.log("user :>> ", user);
    // TODO: 验证是否存在权限
    const hasRole = await this.authService.hasRoles(user.id, method, router);
    // console.log('hasRole :>> ', hasRole);
    return hasRole;
  }
}
