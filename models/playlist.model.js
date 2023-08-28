//@ts-check
import { sequelize, DataTypes } from "../db.js";
import { UserModel } from "./user.model.js";
import { SongModel } from "./song.model.js"; // import el modelo de Song.

// se define el modelo de playlist
export const PlaylistModel = sequelize.define(
  "Playlist",
  {
    id_playlist: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    playlist_name: {
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
    tableName: "playlists",
    paranoid: true,
  }
);

// se establece la relación muchos a uno con User
PlaylistModel.belongsTo(UserModel, {
  foreignKey: "id_user",
});

// se establece la relación uno a muchos con Song
PlaylistModel.hasMany(SongModel, {
  foreignKey: "id_playlist",
});

// función asincrónica para sincronizar el modelo con la base de datos.
(async () => {
  try {
    await PlaylistModel.sync({ force: true });
    console.log("Playlist Model: OK");
  } catch (error) {
    console.error("Error syncing Playlist Model:", error);
  }
})();
