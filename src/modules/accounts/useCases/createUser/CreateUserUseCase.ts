import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppErrors";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const usersAlreadyExists = await this.usersRepository.findByEmail(
            email
        );

        if (usersAlreadyExists) {
            throw new AppError("Users already exists");
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            password: passwordHash,
            email,
            driver_license,
        });
    }
}

export { CreateUserUseCase };
