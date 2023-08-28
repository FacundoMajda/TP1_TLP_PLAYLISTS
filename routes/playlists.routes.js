//@ts-check
import express from "express";
import { Router } from "express";
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

//Rutas para playlists
playlistRouter.post("/createPlaylist", playlistSchema, crearPlaylist);

playlistRouter.get("/playlist/:id", obtenerPlaylist);

playlistRouter.get("/playlist/", obtenerPlaylists);

playlistRouter.put("/playlist/:id", actualizarPlaylist);

playlistRouter.delete("/playlist/:id", eliminarPlaylist);

export default playlistRouter;
