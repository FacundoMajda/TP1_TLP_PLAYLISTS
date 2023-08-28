//@ts-check
import { sequelize, DataTypes } from "../db.js";
import { PlaylistModel } from "./playlist.model.js";

// se define el modelo de usuario
export const UserModel = sequelize.define(
  "User",
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estate_soft_delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "users",
    paranoid: true,
  }
);

//función asincrónica para sincronizar el modelo con la base de datos.
(async () => {
  try {
    await UserModel.sync({ force: true });
    console.log("User Model: OK");
  } catch (error) {
    console.error("Error syncing User Model:", error);
  }
})();
