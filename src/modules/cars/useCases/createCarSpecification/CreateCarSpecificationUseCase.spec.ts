import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create car specification", () => {
    beforeEach(() => {
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase();
    });

    it("should be able to create a specification to a car", async () => {
        await createCarSpecificationUseCase.execute();
    });
});
