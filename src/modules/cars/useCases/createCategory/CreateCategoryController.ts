import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        try {
            const createCategoryUseCase = container.resolve(
                CreateCategoryUseCase
            );

            await createCategoryUseCase.execute({ name, description });
        } catch {
            return response.status(400).send();
        }
        return response.status(201).send();
    }
}

export { CreateCategoryController };
