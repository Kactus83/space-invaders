import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Log de l'erreur pour le débogage et l'audit
  console.error(err);

  // Détermine le message à envoyer selon le type d'erreur
  const message = err instanceof Error ? err.message : 'An unknown error occurred';

  // Détermine le statut HTTP à envoyer selon l'instance de l'erreur ou un statut générique
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).send({
    error: message
  });
};

export default errorHandler;