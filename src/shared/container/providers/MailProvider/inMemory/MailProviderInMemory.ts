import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
    private mail: unknown[] = [];

    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        this.mail.push({ to, subject, variables, path });
    }
}

export { MailProviderInMemory };
