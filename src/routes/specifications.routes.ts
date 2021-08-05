import { Router } from "express";
import { ensureAthenticated } from "../middlewares/ensureAuthenticated";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAthenticated);

specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
