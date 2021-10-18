import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Request,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request & any = context.switchToHttp().getRequest<Request>();

    return request.isAuthenticated();
  }
}
