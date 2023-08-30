//@ts-check
import { validationResult } from "express-validator";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt"; 

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await UserModel.findAll();
    return res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener los usuarios", error);
    return res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

// Obtener un usuario por su ID
export const obtenerUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await UserModel.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ message: "No existe el usuario" });
    }

    return res.json(usuario);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

// Crear un usuario
export const crearUsuario = async (req, res) => {
  const { nickname, password } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      nickname,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Usuario creado con éxito",
      usuario: newUser,
    });
  } catch (error) {
    console.error("Error al crear el usuario", error);
    return res
      .status(500)
      .json({ message: "Error al crear el usuario", error: error.message });
  }
};
