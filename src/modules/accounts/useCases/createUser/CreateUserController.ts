import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, driver_license } = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);
        try {
            await createUserUseCase.execute({
                name,
                email,
                password,
                driver_license,
            });

            return response.status(201).send();
        } catch {
            return response.status(500).json({ error: "user already existds" });
        }
    }
}

export { CreateUserController };
