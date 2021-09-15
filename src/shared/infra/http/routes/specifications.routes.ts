import { Router } from "express";

import { ensureAdmin } from "../../../../middlewares/ensureAdmin";
import { ensureAthenticated } from "../../../../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";

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
