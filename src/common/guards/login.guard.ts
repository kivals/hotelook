import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    console.log('Login Guard1');
    let result = true;
    try {
      result = (await super.canActivate(context)) as boolean;
    } catch (e) {
      console.log(e);
      throw e;
    }
    console.log('Login Guard2');
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}
