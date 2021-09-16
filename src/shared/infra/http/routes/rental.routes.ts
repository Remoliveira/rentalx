import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

import { ensureAthenticated } from "../middlewares/ensureAuthenticated";

import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAthenticated, createRentalController.handle);

rentalRoutes.post(
    "/devolution/:id",
    ensureAthenticated,
    devolutionRentalController.handle
);

rentalRoutes.get("/user", ensureAthenticated, listRentalsByUserController.handle);

export { rentalRoutes };
