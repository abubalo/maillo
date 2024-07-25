import { Router } from "express";
import * as userController from "@/controllers/user.controller"
import { isAuthenticated } from "@/middleware/isAuthenticated";
import { isAuthorized } from "@/middleware/isAuthorized";

const router = Router();

router.post("create", userController.addUser)
router.post("login", userController.loginUser)
router.get("user:id", isAuthenticated, isAuthorized, userController.getUserById)
router.get("users", isAuthenticated, isAuthorized, userController.getUsers)
router.put("update:id", isAuthenticated, isAuthorized, userController.updateUser)
router.delete("delete:id", isAuthenticated, isAuthorized, userController.deleteUser)