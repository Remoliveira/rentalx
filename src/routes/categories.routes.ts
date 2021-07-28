import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoryRoute = Router();

const upload = multer({
    dest: "./tmp",
});

categoryRoute.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoryRoute.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
});

categoryRoute.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController.handle(request, response);
});

export { categoryRoute };
