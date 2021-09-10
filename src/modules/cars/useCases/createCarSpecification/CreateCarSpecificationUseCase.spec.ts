import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationInMemory: SpecificationRepositoryInMemory;

describe("Create car specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationInMemory
        );
    });

    it("should be able to create a specification to a car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "name",
            brand: "brand",
            description: "desc",
            fine_amount: 45,
            daily_rate: 821,
            category_id: "51251",
            license_plate: "6262",
        });

        const specification = await specificationInMemory.create({
            name: "name",
            description: "test",
        });

        const specification_id = [specification.id];

        const specificationCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specification_id,
        });
        // console.log(specificationCars);
        expect(specificationCars).toHaveProperty("specifications");
        expect(specificationCars.specifications.length).toBe(1);
    });

    it("should not be able to create a specification to a car that does not exists", async () => {
        expect(async () => {
            const car_id = "12345";
            const specification_id = ["54321"];

            await createCarSpecificationUseCase.execute({
                car_id,
                specification_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
