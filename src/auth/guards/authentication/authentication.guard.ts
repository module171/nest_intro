import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap: Record<AuthType, CanActivate>;
  constructor(

    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.None]: { canActivate: () => true },
    };
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const requiredAuthTypes = this.reflector.getAllAndOverride<AuthType[]>(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) || [AuthenticationGuard.defaultAuthType];
    // console.log(requiredAuthTypes);
    const guards = requiredAuthTypes.map(authType => this.authTypeGuardMap[authType]);
    
    let error = new UnauthorizedException();
    for (const guard of guards) {
      try {
        const canActivate = await guard.canActivate(context);
        if (canActivate) {
          return true;
        }
      } catch (err) {
        error = err;
      }
    }
    throw error;
    // const authTypeToUse = requiredAuthTypes?.length ? requiredAuthTypes[0] : AuthenticationGuard.defaultAuthType;
    // const guard = this.authTypeGuardMap[authTypeToUse];
    // return guard.canActivate(context);
    // return true;
  }
}
