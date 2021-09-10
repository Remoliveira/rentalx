import { inject, injectable } from "tsyringe";

// import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
    constructor(
        @inject("CarImageRepository")
        private carImageRepository: ICarImageRepository
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.carImageRepository.create(car_id, image);
        });
    }
}

export { UploadCarImageUseCase };
