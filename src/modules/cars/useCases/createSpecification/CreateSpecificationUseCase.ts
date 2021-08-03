import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationRepository
    ) {}
    async execute({ name, description }: IRequest): Promise<void> {
        const specificationExists =
            await this.specificationsRepository.findByName(name);

        if (specificationExists) {
            throw new Error("Specification exist");
        }
        await this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
