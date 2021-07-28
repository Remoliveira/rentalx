import { Router } from "express";

import { categoryRoute } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";

const router = Router();

router.use("/categories", categoryRoute);
router.use("/specifications", specificationsRoutes);

export { router };
