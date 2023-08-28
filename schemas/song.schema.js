import { checkSchema } from "express-validator";

export const songSchema = checkSchema({
  name: {
    isString: true,
    trim: true,
    exists: {
      errorMessage: "El nombre de la canción es requerido",
    },
  },

  artist: {
    isString: true,
    trim: true,
    exists: {
      errorMessage: "El nombre del artista es requerido",
    },
  },

  date_released: {
    isDate: true,
    exists: {
      errorMessage: "La fecha de lanzamiento es requerida",
    },
  },

  song_length: {
    isString: true,
    exists: {
      errorMessage: "La duración de la canción es requerida",
    },
  },
});
