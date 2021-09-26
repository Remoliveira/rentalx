import { Response } from "express";
import { Request } from "supertest";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

class ProfileUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const profileUserUseCase = container.resolve(ProfileUserUseCase);

        const user = await profileUserUseCase.execute(id);

        return response.json(user);
    }
}

export { ProfileUserController };
