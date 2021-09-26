import { Router } from "express";
import multer from "multer";

import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";

import uploadConfig from "../../../../config/upload";
import { ensureAthenticated } from "../../../../middlewares/ensureAuthenticated";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
    "/avatar",
    ensureAthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

usersRoutes.get("/", ensureAthenticated, profileUserController.handle);

export { usersRoutes };
