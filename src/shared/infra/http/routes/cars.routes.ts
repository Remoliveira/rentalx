import { Router } from "express";
import { ensureAdmin } from "middlewares/ensureAdmin";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";

import { ensureAthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();

carsRoutes.post(
    "/",
    ensureAthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get("/available", listCarsController.handle);

export { carsRoutes };
