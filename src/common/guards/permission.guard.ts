import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { request } from "http";


//checks if the user has the required permission to access a route
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const requiredPermission = this.reflector.get<string>('permission', context.getHandler());
    const { user } = context.switchToHttp().getRequest();
    console.log("🚀 request:", requiredPermission)
    console.log('User permissions:', request.user?.permissions);

    return request.user?.permissions?.includes(requiredPermission);
    // if (!user?.permissions) return false;
    // return user.permissions.includes(requiredPermission);
  }
}
