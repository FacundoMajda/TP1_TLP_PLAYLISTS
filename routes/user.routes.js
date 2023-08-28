import { Router } from "express";
import {
  createUserCtrl,
  getUsersCtrl,
  getUserByIdCtrl,
} from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validator.js";
import { userSchema } from "../schemas/user.schema.js";

const userRouter = Router();

userRouter.get("/", getUsersCtrl);
userRouter.get("/:id", getUserByIdCtrl);

// con createCheckSchema se validan los campos del body y luego
// se pasa a validateSchema para que se ejecute la validación
userRouter.post("/NewUser", userSchema, validateSchema, createUserCtrl);

// API CRUD
router.get("/api", index);
router.get("/api/:id/show", show);
router.post("/api", store);
router.put("/api/:id/update", update);
router.delete("/api/:id/destroy", destroy);
