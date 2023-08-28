import "dotenv/config";
import fileDirName from "./modules/dirname.js";
import express from "express";

import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import { sequelize } from "./db.js";

import views from "./routes/index.routes.js";

const app = express();
const port = process.env.PORT || 3000;

const { __dirname } = fileDirName(import.meta);

// Routes setup
app.use("/", views);
app.use("/usuario", userRouter);

app.post(
  "/usuario",
  body("email").notEmpty().isEmail(),
  body("password").notEmpty(),
  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return res.json(req.body);
    }
    console.log(req.body);
    res.status(400).json(errors.array());
  }
);

app.use("/playlist", playlistRouter);
app.use("/canciones", songRouter);

//configuración del motor de plantillas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use((req, res, next) => {
  return res.status(404).render("404");
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    app.use("./modules/relations.js");

    console.log("Conexión a base de datos exitosa");
  } catch (error) {
    console.log("Error al conectar a base de datos", error);
  }
  console.log(`Servidor en ${process.env.APP_URL}:${port}`);
});
