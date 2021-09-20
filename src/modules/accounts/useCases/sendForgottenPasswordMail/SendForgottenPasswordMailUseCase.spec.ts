import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/inMemory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppErrors";

import { SendForgottenPasswordMainUseCase } from "./sendForgottenPasswordMailUseCase";

let sendForgottenPasswordMailUseCase: SendForgottenPasswordMainUseCase;
let usersRepository: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let userTokensRepository: UserTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send a mail to recover a password", () => {
    beforeEach(() => {
        usersRepository = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        userTokensRepository = new UserTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();

        sendForgottenPasswordMailUseCase = new SendForgottenPasswordMainUseCase(
            usersRepository,
            userTokensRepository,
            dateProvider,
            mailProvider
        );
    });

    it("should be able to send a email to recover a forgotten password", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepository.create({
            name: "shikamaru",
            email: "shikamaru@konoha.com",
            driver_license: "12412",
            password: "12345",
        });

        await sendForgottenPasswordMailUseCase.execute("shikamaru@konoha.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not me possible to send an email to a user that dont exists", async () => {
        await expect(
            sendForgottenPasswordMailUseCase.execute("fake@lol.com")
        ).rejects.toEqual(
            new AppError(
                "User does not exists I guess you don't remember this also yes? pathetic"
            )
        );
    });

    it("should be possible to create a new user token", async () => {
        const generate = jest.spyOn(userTokensRepository, "create");

        await usersRepository.create({
            name: "shikamaruwdw",
            email: "shikadwpd,maru@konoha.com",
            driver_license: "1241dwdw2",
            password: "12345",
        });

        await sendForgottenPasswordMailUseCase.execute(
            "shikadwpd,maru@konoha.com"
        );

        expect(generate).toBeCalled();
    });
});
