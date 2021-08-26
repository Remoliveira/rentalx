import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUsecase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUsecase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUsecase(carsRepository);
    });

    it("should be able to create a new car", async () => {
        await createCarUseCase.execute({
            name: "name",
            brand: "brand",
            description: "desc",
            fine_amount: 45,
            daily_rate: 821,
            category_id: "51251",
            license_plate: "6262",
        });
    });
});
