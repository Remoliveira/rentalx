import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "middlewares/ensureAdmin";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post("/", ensureAthenticated, ensureAdmin ,createCarController.handle);

export { carsRoutes };
