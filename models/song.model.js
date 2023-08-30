//@ts-check
import { sequelize, DataTypes } from "../db.js";
import { PlaylistModel } from "./playlist.model.js";

// se define el modelo de cancion
export const SongModel = sequelize.define(
  "Song",
  {
    id_cancion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
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
    },
  },
  {
    tableName: "songs",
    paranoid: true,
  }
);

// función asincrónica para sincronizar el modelo con la base de datos.
(async () => {
  try {
    await SongModel.sync({ force: true });
    console.log("Song Model: OK");
  } catch (error) {
    console.error("Error syncing Song Model:", error);
  }
})();
