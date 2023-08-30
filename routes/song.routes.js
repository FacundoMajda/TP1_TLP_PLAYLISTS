import express from "express";
import {
  crearCancion,
  obtenerCancion,
  obtenerCanciones,
} from "../controllers/song.controller.js";
import { songSchema } from "../schemas/song.schema.js";
import { validateSchema } from "../middlewares/validator.js";

const songRouter = express.Router();

// Rutas para canciones
songRouter.post("/createSong", songSchema, validateSchema, crearCancion);

// Ruta para obtener una canción por su ID
songRouter.get("/showSong/:id", obtenerCancion);

// Ruta para obtener todas las canciones
songRouter.get("/showSong", obtenerCanciones);

export default songRouter;
