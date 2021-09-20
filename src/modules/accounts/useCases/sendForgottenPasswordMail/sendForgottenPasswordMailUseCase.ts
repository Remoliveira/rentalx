import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppErrors";

@injectable()
class SendForgottenPasswordMainUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError(
                "User does not exists I guess you don't remember this also yes? pathetic"
            );
        }
        const templatePath = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "emails",
            "forgottenPassword.hbs"
        );

        const token = uuidv4();
        const expires_date = this.dateProvider.addHours(3);

        await this.userTokensRepository.create({
            user_id: user.id,
            refresh_token: token,
            expires_date,
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`,
        };

        await this.mailProvider.sendMail(
            email,
            "Password recuperation",
            variables,
            templatePath
        );
    }
}

export { SendForgottenPasswordMainUseCase };
