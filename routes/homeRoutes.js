import express from "express";
const router = express.Router();

import { homeController,signController,loginController} from "../controllers/homeController.js";

router.get("/",homeController)

router.get("/signup",signController)

router.get("/login",loginController)


export default router;