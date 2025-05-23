import { User } from "@todo/core/entities/user.entities";
import { ViewUserUseCase } from "@todo/core/use-cases/view-user";
import { getUserRepository } from "@todo/database";
import { BasicError } from "@todo/errors/custom-error/basic-error";
import { PermissionManger } from "@todo/pm";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import {
  ExtractJwt,
  Strategy,
  StrategyOptionsWithoutRequest,
  VerifiedCallback,
} from "passport-jwt";

const SECRET_KEY = process.env.JWT_SECRET || "my_old_secret";

type JWTPayloadType = {
  id: string;
  email: string;
  user: string;
  iat: string;
  exp: string;
};

type AuthorizeOptions = {
  role: string;
  permissions: string | string[];
};

export class PassportMiddleware {
  constructor() {}

  private getOptions(): StrategyOptionsWithoutRequest {
    return {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
    };
  }

  private verifyUser() {
    return async (payload: JWTPayloadType, done: VerifiedCallback) => {
      try {
        const id = payload.id;
        if (!id) {
          return done(new Error("invalid user"), null);
        }
        const viewUserUseCase = new ViewUserUseCase(getUserRepository());
        const findUser = await viewUserUseCase.execute(id);

        if (!findUser) {
          return done(new Error("invalid user"), null);
        }

        return done(null, { user: findUser });
      } catch (error) {
        return done(error, null);
      }
    };
  }

  async init() {
    const opts = this.getOptions();
    passport.use(new Strategy(opts, this.verifyUser()));
  }

  async authenticate(req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    passport.authenticate("jwt", (err: any, data: any) => {
      if (err) {
        return next(err);
      }
      if (!data) {
        return res.status(401).json({
          message: "Unauthorized!",
        });
      }
      const user = data.user as User;
      const pm = new PermissionManger({
        roles: [user.role.toLocaleLowerCase()],
        permission: [],
      });
      req.user = user;
      req.pm = pm;

      return next();
    })(req, res, next);
  }
  authorize({ permissions, role }: AuthorizeOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (!req.pm) {
        throw new BasicError(401, "Unauthorized", ["Unauthorized"]);
      }

      const checkRole = () => {
        if (!role) return true;
        return req.pm?.hasRole(role) ?? false;
      };

      const checkPermissions = () => {
        if (!permissions) return true;
        if (Array.isArray(permissions)) {
          return req.pm?.hasPermissions(permissions) ?? false;
        }
        return req.pm?.hasPermission(permissions);
      };

      const hasAccess = checkRole() && checkPermissions();

      if (!hasAccess) {
        throw new BasicError(403, "Forbidden", ["Forbidden"]);
      }
      next();
    };
  }
}

export const authMiddleware = new PassportMiddleware();
