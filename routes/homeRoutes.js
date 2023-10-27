import express from "express";
const router = express.Router();

import { homeController,signController } from "../controllers/homeController.js";

router.get("/",homeController)

router.get("/signup",signController)


export default router;