import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoryRoute = Router();
const categoriesRepository = new CategoriesRepository();

categoryRoute.post("/", (request, response) => {
    const { name, description } = request.body;

    const categoryExists = categoriesRepository.findCategoryName(name);
    if (categoryExists) {
        return response.status(400).json({ error: "Category exists" });
    }

    categoriesRepository.create({ name, description });
    return response.status(201).send();
});

categoryRoute.get("/", (request, response) => {
    const list = categoriesRepository.list();
    return response.json(list);
});

export { categoryRoute };
