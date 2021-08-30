import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUsecase } from "./CreateCarUseCase";

class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            description,
            daily_rate,
            license_plate,
            brand,
            category_id,
            fine_amount,
        } = request.body;

        const createCarUseCase = container.resolve(CreateCarUsecase);

        const car = await createCarUseCase.execute({
            name,
            description,
            daily_rate,
            license_plate,
            brand,
            category_id,
            fine_amount,
        });

        return response.status(201).json(car);
    }
}

export { CreateCarController };
