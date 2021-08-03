import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const createSpecificationUseCase = container.resolve(
            CreateSpecificationUseCase
        );
        try {
            const { name, description } = request.body;

            await createSpecificationUseCase.execute({ name, description });
        } catch {
            return response
                .status(500)
                .json({ message: "spec already exists" });
        }
        return response.status(201).send();
    }
}

export { CreateSpecificationController };
