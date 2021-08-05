import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppErrors";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({ description, name }: IRequest): Promise<void> {
        const categoryExists = await this.categoriesRepository.findCategoryName(
            name
        );
        if (categoryExists) {
            throw new AppError("category Already exists");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
