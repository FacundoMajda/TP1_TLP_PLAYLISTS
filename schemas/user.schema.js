
import { checkSchema } from "express-validator";

export const userSchema = checkSchema({
  username: {
    isString: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "El nombre de usuario debe tener al menos 3 caracteres",
    },
    trim: true,
    exists: {
      errorMessage: "El nombre de usuario es requerido",
    },
    custom: {
      options: async (value) => {
        const existingUser = await UserModel.findOne({
          where: { username: value },
        });
        if (existingUser) {
          throw new Error("El nombre de usuario ya está en uso");
        }
        return true;
      },
    },
  },

  email: {
    isEmail: true,
    exists: {
      errorMessage: "El correo electrónico es requerido",
    },
    custom: {
      options: async (value) => {
        const existingEmail = await UserModel.findOne({
          where: { email: value },
        });
        if (existingEmail) {
          throw new Error("El correo electrónico ya está en uso");
        }
        return true;
      },
    },
  },

  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "La contraseña debe tener al menos 8 caracteres",
    },
    exists: {
      errorMessage: "La contraseña es requerida",
    },
  },
});
