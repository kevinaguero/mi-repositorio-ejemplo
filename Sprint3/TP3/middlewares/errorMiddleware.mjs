// src/middleware/errorMiddleware.mjs
import { validationResult } from 'express-validator';

// Middleware para manejar errores de validación
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);//obtengo el error de validacion de la solicitud 
  //si tengo errores entra en el if y devuelve http 400
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();//permitir que la solicitud continúe al siguiente middleware o controlador.
};