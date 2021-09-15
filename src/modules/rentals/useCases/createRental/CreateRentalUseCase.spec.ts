import dayjs from "dayjs";

import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppErrors";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMemory;
let dateProvider: IDateProvider;
let carsRepository: ICarsRepository;

describe("Create rental", () => {
    const add24hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        carsRepository = new CarsRepository();
        rentalsRepository = new RentalsRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,
            dateProvider,
            carsRepository
        );
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "123",
            car_id: "456",
            expected_return_date: add24hours,
        });

        expect(rental).toHaveProperty("id");
    });

    it("shouldn't be able to create a new rental if a user already have a open one", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "456",
                expected_return_date: add24hours,
            });
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "456",
                expected_return_date: add24hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("shouldn't be able to create a new rental if the desired car is already rented", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "456",
                expected_return_date: add24hours,
            });
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "456",
                expected_return_date: add24hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rent with less than 24 hours per rent", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12344",
                car_id: "3456",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
