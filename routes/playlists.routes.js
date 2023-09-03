//@ts-check
import express from "express";
import {
  crearPlaylist,
  obtenerPlaylist,
  obtenerPlaylists,
  actualizarPlaylist,
  eliminarPlaylist,
} from "../controllers/playlist.controller.js";
import { validateSchema } from "../middlewares/validator.js";
import { playlistSchema } from "../schemas/playlist.schema.js";

const playlistRouter = express.Router();

// Ruta para crear una nueva playlist
playlistRouter.post(
  "/createPlaylist",
  playlistSchema,
  validateSchema,
  crearPlaylist
);

// Ruta para obtener una playlist por su ID
playlistRouter.get("/playlist/:id", obtenerPlaylist);

// Ruta para obtener todas las playlists
playlistRouter.get("/playlist/", obtenerPlaylists);

// Ruta para actualizar una playlist por su ID
playlistRouter.put("/playlist/:id", actualizarPlaylist);

// Ruta para eliminar una playlist por su ID
playlistRouter.delete("/playlist/:id", eliminarPlaylist);

export default playlistRouter;
