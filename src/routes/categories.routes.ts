import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoryRoute = Router();
const categoriesRepository = new CategoriesRepository();

categoryRoute.post("/", (request, response) => {
    const { name, description } = request.body;

    const createCategoryService = new CreateCategoryService(
        categoriesRepository
    );

    createCategoryService.execute({ name, description });

    return response.status(201).send();
});

categoryRoute.get("/", (request, response) => {
    const list = categoriesRepository.list();
    return response.json(list);
});

export { categoryRoute };
