import { NextFunction, Response, Request } from "express";
import ApiResponse from "../helpers/response.js";
import prisma from "../helpers/prisma.js";
import { BadRequest, NotFound } from "../helpers/error.js";

class CategoryController {
  static async getAll(req: Request<any>, res: Response, next: NextFunction) {
    try {
      const categories = await prisma.category.findMany();

      return ApiResponse.success(res, "Récupération des catégories effectuée avec succès.", { list: categories, pagination: null });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request<any>, res: Response, next: NextFunction) {
    try {
      const result = await prisma.category.findFirst({
        where: {
          id: req.params.id
        }
      });

      if (!result) throw new NotFound("Catégorie introuvable.");

      return ApiResponse.success(res, "Récupération de la catégorie effectuée avec succès.", result);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request<any>, res: Response, next: NextFunction) {
    try {
      const result = await prisma.category.create({
        data: {
          name: req.body.name,
          description: req.body.description,
        }
      });

      return ApiResponse.created(res, "Catégorie créée avec succès.", result);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request<any>, res: Response, next: NextFunction) {
    try {
      const categoryExisting = await prisma.category.findFirst({
        where: {
          id: req.params.id
        }
      });

      if (!categoryExisting) throw new BadRequest("Catégorie introuvable.")

      const result = await prisma.category.update({
        where: req.params.id, data: {
          name: req.body.name,
          description: req.body.description,
        }
      });

      return ApiResponse.success(res, "Catégorie modifiée avec succès.", result);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request<any>, res: Response, next: NextFunction) {
    try {
      const categoryExisting = await prisma.category.findFirst({
        where: {
          id: req.params.id
        }
      });

      const result = await prisma.category.delete({ where: req.params.id });

      if (result) {
        return ApiResponse.success(res, "Catégorie supprimée avec succès.", categoryExisting);
      } else {
        return ApiResponse.success(res, "", null, 204);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;