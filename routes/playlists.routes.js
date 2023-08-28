import express from "express";
import {
  crearPlaylist,
  obtenerPlaylist,
  obtenerPlaylists,
  actualizarPlaylist,
  eliminarPlaylist,
} from "../controllers/playlists.controllers.js";
const playlistRouter = express.Router();

//Rutas para playlists
playlistRouter.post("/crear/playlist", crearPlaylist);

playlistRouter.get("/playlist/:id", obtenerPlaylist);

playlistRouter.get("/playlists/", obtenerPlaylists);

playlistRouter.put("/playlist/:id", actualizarPlaylist);

playlistRouter.delete("/playlist/:id", eliminarPlaylist);

export default playlistRouter;
