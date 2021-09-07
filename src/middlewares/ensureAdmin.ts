import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppErrors";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;

    const userRepository = new UsersRepository();
    const user = await userRepository.findById(id);
    console.log(user.id);

    if (user.isAdmin === false) {
        console.log(user);
        throw new AppError("User is not admin");
    }
    return next();
}
