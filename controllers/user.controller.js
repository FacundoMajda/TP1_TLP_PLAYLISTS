import { UserModel } from "../model/user.model.js";

export const createUserCtrl = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsersCtrl = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserByIdCtrl = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
