import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppErrors";
import { NextFunction, Request, Response } from "express";


export async function ensureAdmin(request: Request, response: Response, next: NextFunction){

    const { id } = request.body;

    const userRepository = new UsersRepository()
    const user = await userRepository.findById(id)

    if(!user.isAdmin) {
        throw new AppError("User is not admin");
    }
    return next()
}