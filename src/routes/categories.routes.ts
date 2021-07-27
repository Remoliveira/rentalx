import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoryRoute = Router();

categoryRoute.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoryRoute.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
});

export { categoryRoute };
