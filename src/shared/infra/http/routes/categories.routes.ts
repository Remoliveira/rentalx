import { Router } from "express";
import { ensureAdmin } from "middlewares/ensureAdmin";
import multer from "multer";

import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAthenticated } from "../middlewares/ensureAuthenticated";

const categoryRoute = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoryRoute.post(
    "/",
    ensureAthenticated,
    ensureAdmin,
    createCategoryController.handle
);

categoryRoute.get("/", listCategoriesController.handle);

categoryRoute.post(
    "/import",
    ensureAthenticated,
    ensureAdmin,
    upload.single("file"),
    importCategoryController.handle
);

export { categoryRoute };
