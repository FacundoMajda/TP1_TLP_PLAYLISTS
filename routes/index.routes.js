import "dotenv/config";
import { Router } from "express";

import { indexView } from "../controllers/index.controller.js";

const views = Router();
//Vistas
views.get("/", indexView);

export default views;
