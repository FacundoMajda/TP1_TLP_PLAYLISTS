import { checkSchema } from "express-validator";
export const userSchema = checkSchema({
  username: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    isEmail: true,
    errorMessage: "Please enter a valid email address",
  },

  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Please enter a valid password",
    },
  },
});
