import { BadRequest, Conflict, InternalServerError, NotFound } from "../helpers/error.js";
import { Prisma } from "../generated/prisma/client.js";
import Logger from "../helpers/logger.js";
import { NextFunction, Request, Response } from "express";
import multer from "multer";

const handleGlobalError = (err: any, req: Request, res: Response, next: NextFunction) => {
  Logger.error("Error", err.message, err);

  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(400).json({
          status: "fail",
          message: "La taille du fichier dépasse la limite autorisée",
          data: null,
        });

      case "LIMIT_FILE_COUNT":
        return res.status(400).json({
          status: "fail",
          message: "Trop de fichiers envoyés",
          data: null,
        });

      case "LIMIT_UNEXPECTED_FILE":
        return res.status(400).json({
          status: "fail",
          message: "Champ de fichier inattendu",
          data: null,
        });

      default:
        return res.status(400).json({
          status: "fail",
          message: err.message || "Erreur lors de l'upload du fichier",
          data: null,
        });
    }
  }

  if (err.message === "INVALID_FILE_TYPE") {
    return res.status(400).json({
      status: "fail",
      message: "Type de fichier invalide",
      data: null,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return new Conflict("Donnée déjà existante");

      case "P2025":
      case "P2001":
        return new NotFound("Ressource non trouvée");

      case "P2003":
        return new BadRequest("Violation de clé étrangère");

      case "P2011":
      case "P2012":
      case "P2013":
        return new BadRequest("Données invalides");

      case "P2000":
        return new BadRequest("Valeur trop longue");

      case "P2024":
        return new InternalServerError("Timeout base de données");

      default:
        return new BadRequest("Erreur base de données");
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return new BadRequest("Requête Prisma invalide");
  }

  if (err instanceof Prisma.PrismaClientInitializationError) {
    return new InternalServerError(
      "Impossible de se connecter à la base de données",
    );
  }

  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    return new InternalServerError("Erreur inconnue Prisma");
  }

  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Internal server error",
    data: null,
  });
};

export default handleGlobalError;
