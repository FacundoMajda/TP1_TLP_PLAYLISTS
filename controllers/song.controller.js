import { validationResult } from "express-validator";
import { SongModel } from "../models/song.model.js";
import { PlaylistModel } from "../models/playlist.model.js";

// Crear una canción
export const crearCancion = async (req, res) => {
  const { name, artist, id_playlist } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingPlaylist = await PlaylistModel.findByPk(id_playlist);

    if (!existingPlaylist) {
      return res.status(400).json({ message: "La playlist no existe" });
    }

    const newSong = await SongModel.create({
      name,
      artist,
      PlaylistId: id_playlist,
    });

    return res.status(201).json({
      message: "Canción creada con éxito",
      song: newSong,
    });
  } catch (error) {
    console.error("Error al crear la canción", error);
    return res
      .status(500)
      .json({ message: "Error al crear la canción", error: error.message });
  }
};

// Obtener una canción por su ID
export const obtenerCancion = async (req, res) => {
  const { id } = req.params;

  try {
    const song = await SongModel.findOne({
      where: { id },
      include: [{ model: PlaylistModel }],
    });

    if (!song) {
      return res.status(404).json({ message: "No existe la canción" });
    }

    return res.json(song);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

// Obtener todas las canciones
export const obtenerCanciones = async (req, res) => {
  try {
    const songs = await SongModel.findAll({
      include: [{ model: PlaylistModel }],
    });

    return res.json(songs);
  } catch (error) {
    console.error("Error al obtener las canciones", error);
    return res.status(500).json({ message: "Error al obtener las canciones" });
  }
};
