import { NextFunction, Response, Request } from "express";
import { BadRequest, NotFound } from "../helpers/error.js";
import ApiResponse from "../helpers/response.js";
import prisma from "../helpers/prisma.js";



class ProductController {
  static async getAll(req: Request<any>, res: Response, next: NextFunction) {
    try {
      const produits = await prisma.product.findMany();

      return ApiResponse.success(res, "Récupération des produits effectuée avec succès.", { list: produits, pagination: null });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request<any>, res: Response, next: NextFunction) {
    try {
      if (!req.params.id)
        return res.status(422).json({
          message: "Identifiant du produit invalide.",
          data: null,
        });

      const result = await prisma.product.findFirst({
        where: {
          id: req.params.id
        }
      });

      if (!result)
        return res.status(404).json({
          message: "Produit introuvable.",
          data: null,
        });

      return ApiResponse.success(res, "Récupération du produit effectuée avec succès.", result);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request<any>, res: Response, next: NextFunction) {
    try {
      const category = await prisma.product.findFirst({
        where: {
          id: req.params.id
        }
      });

      if (!category) throw new BadRequest("Catégorie introuvable.");

      const result = await prisma.product.create({
        data: {
          name: req.body.name,
          shortDescription: req.body.shortDescription,
          longDescription: req.body.longDescription,
          price: req.body.price,
          categoryId: req.body.categoryId,
          images: { image: "http://localhost" },
        }
      });

      return ApiResponse.created(res, "Produit créé avec succès.", result);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request<any>, res: Response, next: NextFunction) {
    try {
      const productExisting = await prisma.product.findFirst({
        where: {
          id: req.params.id
        }
      });

      if (!productExisting) throw new NotFound("Produit introuvable.");

      const result = await prisma.product.update({
        where: { id: req.params.id },
        data: {
          name: req.body.name,
          longDescription: req.body.description,
        }
      });

      return ApiResponse.success(res, "Produit modifié avec succès.", result);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request<any>, res: Response, next: NextFunction) {
    try {
      const productExisting = await prisma.product.findFirst({
        where: {
          id: req.params.id
        }
      });

      const result = await prisma.product.delete({ where: req.params.id });

      if (result) {
        return ApiResponse.success(res, "Produit supprimé avec succès.", productExisting);
      } else {
        return ApiResponse.success(res, "", null, 204);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;