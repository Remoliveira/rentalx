import { Router } from "express";

import { categoryRoute } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoryRoute);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);

export { router };
