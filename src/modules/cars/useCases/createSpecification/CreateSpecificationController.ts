import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
    handle(request: Request, response: Response): Response {
        const createSpecificationUseCase = container.resolve(
            CreateSpecificationUseCase
        );

        const { name, description } = request.body;

        createSpecificationUseCase.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateSpecificationController };
