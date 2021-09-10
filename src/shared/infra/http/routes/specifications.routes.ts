import { Router } from "express";
import { ensureAdmin } from "middlewares/ensureAdmin";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

// specificationsRoutes.use(ensureAthenticated);

specificationsRoutes.post(
    "/",
    ensureAthenticated,
    ensureAdmin,
    createSpecificationController.handle
);

export { specificationsRoutes };
