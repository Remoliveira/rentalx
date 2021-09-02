import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoryRoute } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoryRoute);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use(authenticateRoutes);

export { router };