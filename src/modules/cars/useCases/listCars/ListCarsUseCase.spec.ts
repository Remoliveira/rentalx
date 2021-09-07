import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "car",
            description: "pica",
            daily_rate: 420,
            license_plate: "8128ff",
            brand: "audi",
            category_id: "259b4e79-524f-48f7-8a01-0813c1d60f4f",
            fine_amount: 78,
        });

        const cars = await listCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it("should be able to list all cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "car2",
            description: "pica",
            daily_rate: 420,
            license_plate: "8128",
            brand: "audi",
            category_id: "259b4e79-524f-48f7-8a01-0813c1d60f4f",
            fine_amount: 78,
        });

        const cars = await listCarsUseCase.execute({ name: "car2" });
        expect(cars).toEqual([car]);
    });
    it("should be able to list all cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "car3",
            description: "pica",
            daily_rate: 420,
            license_plate: "8",
            brand: "audi",
            category_id: "259b4e79-524f-48f7-8a01-0813c1d60f4f",
            fine_amount: 78,
        });

        const cars = await listCarsUseCase.execute({ brand: "audi" });
        expect(cars).toEqual([car]);
    });
    it("should be able to list all cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "car4",
            description: "pica",
            daily_rate: 420,
            license_plate: "8xx",
            brand: "audi",
            category_id: "259b4e79-524f-48f7-8a01-0813c1d60f4f",
            fine_amount: 78,
        });

        const cars = await listCarsUseCase.execute({
            category_id: "259b4e79-524f-48f7-8a01-0813c1d60f4f",
        });
        expect(cars).toEqual([car]);
    });
});
