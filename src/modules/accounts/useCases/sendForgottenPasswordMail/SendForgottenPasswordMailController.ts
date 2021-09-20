import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgottenPasswordMainUseCase } from "./sendForgottenPasswordMailUseCase";

class SendForgottenPasswordMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendForgottenPasswordMailUseCase = container.resolve(
            SendForgottenPasswordMainUseCase
        );

        await sendForgottenPasswordMailUseCase.execute(email);

        return response.send();
    }
}

export { SendForgottenPasswordMailController };
