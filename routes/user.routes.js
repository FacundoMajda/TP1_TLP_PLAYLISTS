import express from "express";
import {
  crearUsuario,
  obtenerUsuario,
  obtenerUsuarios,
} from "../controllers/user.controller";
import { validateSchema } from "../middlewares/validator";
import { userSchema } from "../schemas/user.schema.js";

const userRouter = express.Router();

// Rutas para obtener usuarios
userRouter.get("/usuarios", obtenerUsuarios);
userRouter.get("/usuarios/:id", obtenerUsuario);

// Ruta para crear un nuevo usuario
userRouter.post("/usuarios", userSchema, validateSchema, crearUsuario);

export default userRouter;
