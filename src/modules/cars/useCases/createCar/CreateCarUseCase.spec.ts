import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";

import { CreateCarUsecase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUsecase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUsecase(carsRepository);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "name",
            brand: "brand",
            description: "desc",
            fine_amount: 45,
            daily_rate: 821,
            category_id: "51251",
            license_plate: "6262",
        });
        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with the same license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "car1",
                brand: "brand",
                description: "desc",
                fine_amount: 45,
                daily_rate: 821,
                category_id: "51251",
                license_plate: "6262",
            });
            await createCarUseCase.execute({
                name: "car2",
                brand: "brand",
                description: "desc",
                fine_amount: 45,
                daily_rate: 821,
                category_id: "51251",
                license_plate: "6262",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to create a new car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "name",
            brand: "brand",
            description: "desc",
            fine_amount: 45,
            daily_rate: 821,
            category_id: "51251",
            license_plate: "684562",
        });

        expect(car.available).toBe(true);
    });
});
