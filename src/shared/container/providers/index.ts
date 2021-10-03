import { container } from "tsyringe";

import "dotenv/config";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { SesMailProvider } from "./MailProvider/implementations/SesMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SesMailProvider),
};

container.registerInstance<IMailProvider>(
    "MailProvider",
    mailProvider[process.env.mail]
);

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.disk]
);
