import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload{
    sub: string;
}

export async function ensureAthenticated( request: Request, response: Response, next: NextFunction){
    
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new Error("Missing token");
    }

    const [, token] = authHeader.split(" "); 

    try{
        const { sub: user_id } = verify(token, "1ef9970788ee0e90bbc98d7762c3d1df") as IPayload;
        console.log(user_id);

        const usersRepository = new UsersRepository()
        const user = await usersRepository.findById(user_id);

        if(!user){
            throw new Error("User dont exists");
        }

        next();
    }catch{
        throw new Error("Invalid Token");
    }
}