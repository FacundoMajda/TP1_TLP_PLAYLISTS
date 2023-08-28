// archivo de relaciones
import { UserModel } from "./models/user.model";
import { PlaylistModel } from "./models/playlist.model";
import { SongModel } from "./models/song.model";

export const configureRelations = async () => {
  try {
    PlaylistModel.belongsTo(UserModel, {
      foreignKey: "id_user",
    });

    PlaylistModel.hasMany(SongModel, {
      foreignKey: "id_playlist",
    });

    SongModel.belongsTo(PlaylistModel, {
      foreignKey: "id_playlist",
    });

    UserModel.hasMany(PlaylistModel, { foreignKey: "id_user" });

    // Sincronizar los modelos con la base de datos
    await UserModel.sync();
    await PlaylistModel.sync();
    await SongModel.sync();

    console.log("Relaciones de modelos configuradas y modelos sincronizados");
  } catch (error) {
    console.error(
      "Error al configurar las relaciones y sincronizar modelos:",
      error
    );
  }
};

// Ejecutar la configuración de relaciones
configureRelations();
