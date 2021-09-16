import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import dayjs from "dayjs";

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
        carsRepository = new CarsRepositoryInMemory();
        rentalsRepository = new RentalsRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,
            dateProvider,
            carsRepository
        );
    });

    it("should be able to create a new rental", async () => {
        
        const car = await carsRepository.create({
            name: "tst",
            license_plate: "123",
            fine_amount: 34,
            daily_rate: 35,
            category_id: "1234",
            brand: "brand",
            description:"test"
        });
        
        const rental = await createRentalUseCase.execute({
            user_id: "123",
            car_id: car.id,
            expected_return_date: add24hours,
        });

        expect(rental).toHaveProperty("id");
    });

    it("shouldn't be able to create a new rental if a user already have a open one", async () => {
        await rentalsRepository.create({
            user_id: "1234",
            car_id: "tst",
            expected_return_date: add24hours,
        });
        
        await expect(createRentalUseCase.execute({
                user_id: "1234",
                car_id: "456",
                expected_return_date: add24hours,
            })
        ).rejects.toEqual(new AppError("User already rent a car"));
    });

    it("shouldn't be able to create a new rental if the desired car is already rented", async () => {
        await rentalsRepository.create({
           car_id:"3456",
           expected_return_date: add24hours,
           user_id:"1234",
        })
        
        await expect(createRentalUseCase.execute({
                user_id: "12345",
                car_id: "3456",
                expected_return_date: add24hours,
            })
        ).rejects.toEqual(new AppError("Car is not available"));
    });

    it("should not be able to create a new rent with less than 24 hours per rent", async () => {
       
        await expect(createRentalUseCase.execute({
                user_id: "12344",
                car_id: "3456",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Rental does not fullfil the minimum hours required"));
    });
});
