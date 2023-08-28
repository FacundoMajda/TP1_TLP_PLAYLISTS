import express from 'express';
import {crearCancion, obtenerCancion, obtenerCanciones} from '../controllers/canciones.controllers.js';
const router = express.Router();

//Rutas para canciones
router.post('/cancion', crearCancion);

router.get('/cancion/:id', obtenerCancion);

router.get('/canciones', obtenerCanciones);


export default router;