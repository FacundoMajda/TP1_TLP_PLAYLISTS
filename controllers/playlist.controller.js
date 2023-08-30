//@ts-check

import { validationResult } from "express-validator";
import { PlaylistModel } from "../models/playlist.model";
import { UserModel } from "../models/user.model";
import { SongModel } from "../models/song.model";

// Obtener todas las playlists
export const obtenerPlaylists = async (req, res) => {
  try {
    const playlists = await PlaylistModel.findAll({
      where: {
        estado: true,
      },
    });
    return res.json(playlists);
  } catch (error) {
    console.error("Error al obtener las playlists", error);
    return res.status(500).json({ message: "Error al obtener las playlists" });
  }
};

// Obtener una playlist por su ID
export const obtenerPlaylist = async (req, res) => {
  const { id } = req.params;

  try {
    const playlist = await PlaylistModel.findOne({
      where: { id },
      include: [{ model: SongModel }],
    });

    if (!playlist) {
      return res.status(404).json({ message: "No existe la playlist" });
    }

    return res.json(playlist);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

// Crear una playlist
export const crearPlaylist = async (req, res) => {
  const { playlist_name, id_user } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await UserModel.findByPk(id_user);

    if (!existingUser) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    const newPlaylist = await PlaylistModel.create({
      playlist_name,
      id_user,
    });

    return res.status(201).json({
      message: "Playlist creada con éxito",
      playlist: newPlaylist,
    });
  } catch (error) {
    console.error("Error al crear la playlist", error);
    return res
      .status(500)
      .json({ message: "Error al crear la playlist", error: error.message });
  }
};

// Actualizar una playlist
export const actualizarPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await PlaylistModel.findByPk(id);

    if (!playlist) {
      return res.status(404).json({
        message: "No se encontró la playlist",
      });
    }

    await playlist.update(req.body);
    return res.json({
      message: "Playlist actualizada exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar la playlist", error);
    return res.status(500).json({
      message: "Error al actualizar la playlist",
    });
  }
};

// Eliminar una playlist
export const eliminarPlaylist = async (req, res) => {
  const { id } = req.params;

  try {
    const playlistEliminada = await PlaylistModel.destroy({
      where: {
        id,
      },
    });

    if (!playlistEliminada) {
      return res.status(400).json({
        message: "No se pudo eliminar la playlist",
      });
    }

    return res.json({
      message: "Playlist eliminada correctamente",
      playlistEliminada,
    });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};
