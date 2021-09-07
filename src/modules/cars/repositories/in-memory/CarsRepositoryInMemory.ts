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
    }: ICreateCarDTO): Promise<Car> {
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
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const all = this.cars.filter(
            (car) =>
                car.available === true ||
                car.brand === brand ||
                car.category_id === category_id ||
                car.name === name
        );
        return all;
    }
}

export { CarsRepositoryInMemory };
