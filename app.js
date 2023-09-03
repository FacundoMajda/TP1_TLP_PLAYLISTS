//@ts-check
// Import y carga las variables de entorno desde el archivo .env
import "dotenv/config";

// Importa el módulo fileDirName para obtener la ruta del directorio actual
import fileDirName from "./modules/dirname.js";

// Importa las librerías necesarias
import express from "express";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import { sequelize } from "./db.js";

// Importa las rutas de cada entidad
import playlistRouter from "./routes/playlists.routes.js";
import userRouter from "./routes/user.routes.js";
import songRouter from "./routes/song.routes.js";

// Importa la función para configurar las relaciones entre modelos
import { configRelations } from "./modules/relations.js";

// Crea una instancia de la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Obtiene el valor de __dirname usando el módulo fileDirName
const { __dirname } = fileDirName(import.meta);

// Configuración de las rutas de las vistas y las entidades
// app.use("/", views); // Configura tus rutas de vistas aquí
app.use("/users", userRouter); // Rutas de usuarios
app.use("/playlist", playlistRouter); // Rutas de playlists
app.use("/songs", songRouter); // Rutas de canciones

// Configuración del motor de plantillas EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(helmet()); // Middleware para la seguridad del encabezado HTTP
app.use(morgan("dev")); // Middleware para el registro de solicitudes en consola
app.use(express.json()); // Middleware para parsear JSON en las solicitudes
app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formulario
app.use(express.static(path.join(__dirname, "public"))); // Middleware para servir archivos estáticos

// Configuración de la política de seguridad de contenido para helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
  return res.status(404).render("404"); // Renderiza una vista de error 404
});

// Inicia el servidor en el puerto especificado
app.listen(port, async () => {
  try {
    await sequelize.authenticate(); // Intenta autenticarse con la base de datos

    // Configura las relaciones entre los modelos
    configRelations();

    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.log("Error al conectar a la base de datos", error);
  }
  console.log(`Servidor en ${process.env.APP_URL}:${port}`);
});
