import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppErrors";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
class CreateCarUsecase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: IRequest): Promise<Car> {
        const carsAlreadyExists = await this.carsRepository.findByLicensePlate(
            license_plate
        );

        if (carsAlreadyExists) {
            throw new AppError("Car Already Exists");
        }

        const car = await this.carsRepository.create({
            name,
            brand,
            description,
            category_id,
            daily_rate,
            fine_amount,
            license_plate,
        });
        return car;
    }
}

export { CreateCarUsecase };
