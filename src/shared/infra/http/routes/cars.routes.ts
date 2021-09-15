import { Router } from "express";
import multer from "multer";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadcarImageController";

import uploadConfig from "../../../../config/upload";
import { ensureAdmin } from "../../../../middlewares/ensureAdmin";
import { ensureAthenticated } from "../../../../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const carImageUpload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
    "/",
    ensureAthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get("/available", listCarsController.handle);

carsRoutes.post(
    "/specifications/:id",
    ensureAthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

carsRoutes.post(
    "/images/:id",
    ensureAthenticated,
    ensureAdmin,
    carImageUpload.array("images"),
    uploadCarImageController.handle
);

export { carsRoutes };
