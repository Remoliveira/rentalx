import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUserTokensRepository } from "../IUserTokensRepository";

class UserTokensRepositoryInMemory implements IUserTokensRepository {
    userTokens: UserTokens[] = [];

    async create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokensDTO): Promise<UserTokens> {
        const userTokens = new UserTokens();

        Object.assign(userTokens, {
            expires_date,
            user_id,
            refresh_token,
        });

        this.userTokens.push(userTokens);

        return userTokens;
    }
    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        const userToken = this.userTokens.find(
            (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
        );

        return userToken;
    }
    async deleteById(id: string): Promise<void> {
        const userToken = this.userTokens.find((ut) => ut.id === id);

        this.userTokens.splice(this.userTokens.indexOf(userToken));
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        return this.userTokens.find((ut) => ut.refresh_token === refresh_token);
    }
}

export { UserTokensRepositoryInMemory };
