//@ts-check
import express from "express";
import { Router } from "express";
import {
  crearUsuario,
  obtenerUsuario,
  obtenerUsuarios,
} from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validator.js";
import { userSchema } from "../schemas/user.schema.js";

const userRouter = express.Router();

userRouter.get("/obtenerUsuario", obtenerUsuarios);
userRouter.get("/obtenerUsuario/:id", obtenerUsuario);
userRouter.post("/crearUsuario", userSchema, validateSchema, crearUsuario);

export default userRouter;
