import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppErrors";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUsersUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUsersUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be possible to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "0000",
            name: "test",
            password: "1234",
            email: "oi@oi.com",
        };

        await createUsersUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate without a user",async() => {
        await expect( authenticateUserUseCase.execute({
                email: "false",
                password: "non",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });

    it("should not be able to login with a wrong password",async () => {
        const user: ICreateUserDTO = {
            driver_license: "0000",
            name: "test",
            password: "1234",
            email: "oi@oi.com",
        };

        await createUsersUseCase.execute(user);
        
        await expect( authenticateUserUseCase.execute({
                email: user.email,
                password: "wrong passwotrd",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });
});
