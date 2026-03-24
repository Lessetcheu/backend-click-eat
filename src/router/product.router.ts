import express from "express";
import ProductController from "../controller/product.controller.js";
import validate from "../middleware/validation.middleware.js";
import {
  getByIdProductSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from "../validation/product.validation.js";


const router = express.Router();

router.get("/", ProductController.getAll);
router.get("/:id", validate(getByIdProductSchema), ProductController.getById);
router.post("/", validate(createProductSchema), ProductController.create);
router.put("/:id", validate(updateProductSchema), ProductController.update);
router.delete(
  "/:id",
  validate(deleteProductSchema),
  ProductController.delete,
);

export default router;
