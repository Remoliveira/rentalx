import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationRepository) {}
    execute({ name, description }: IRequest): void {
        const specificationExists =
            this.specificationsRepository.findByName(name);

        if (specificationExists) {
            throw new Error("Specification exist");
        }
        this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
