import { getRepository, Repository } from "typeorm";

import {
    ICreateSpecificationDTO,
    ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationRepository";

import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationRepository {
    private respository: Repository<Specification>;

    constructor() {
        this.respository = getRepository(Specification);
    }

    async create({
        description,
        name,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.respository.create({
            description,
            name,
        });

        await this.respository.save(specification);

        return specification;
    }
    async findByName(name: string): Promise<Specification> {
        const specification = await this.respository.findOne({
            name,
        });
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.respository.findByIds(ids);
        return specifications;
    }
}

export { SpecificationRepository };
