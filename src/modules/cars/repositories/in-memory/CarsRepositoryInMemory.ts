import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({
        name,
        brand,
        description,
        category_id,
        daily_rate,
        fine_amount,
        license_plate,
    }: ICreateCarDTO): Promise<void> {
        const car = new Car();

        Object.assign(car, {
            name,
            brand,
            description,
            category_id,
            daily_rate,
            fine_amount,
            license_plate,
        });

        this.cars.push(car);
    }
}

export { CarsRepositoryInMemory };
