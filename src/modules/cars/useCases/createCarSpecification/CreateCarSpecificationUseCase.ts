import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppErrors';
import { inject } from "tsyringe";

interface IRequest {
    car_id: string;
    specification_id: string[];
}

class CreateCarSpecificationUseCase {

    constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository
    ){}

    async execute({ car_id, specification_id }: IRequest): Promise<void> {

        const carsExist = await this.carsRepository.findById(car_id);

        if(!carsExist) {
            throw new AppError("Car does not exist");
        }
    }
}

export { CreateCarSpecificationUseCase };
