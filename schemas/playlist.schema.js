import { checkSchema } from "express-validator";

export const playlistSchema = checkSchema({
  playlist_name: {
    isString: true,
    trim: true,
    exists: {
      errorMessage: "El nombre de la playlist es requerido",
    },
  },
});
