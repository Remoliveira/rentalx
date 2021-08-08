import { AppError } from "../../../../errors/AppErrors";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
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

    it("should not be able to authenticate without a user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false",
                password: "non",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to login with a wrong password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "0000",
                name: "test",
                password: "1234",
                email: "oi@oi.com",
            };

            await createUsersUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "wrong passwotrd",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
