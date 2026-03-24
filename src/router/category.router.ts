import express from "express";
import validate from "../middleware/validation.middleware.js";
import CategoryController from "../controller/category.controller.js";
import {   getByIdCategorySchema,
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema, } from "../validation/category.validation.js";


const router = express.Router();

router.get("/", CategoryController.getAll);
router.get("/:id", validate(getByIdCategorySchema), CategoryController.getById);
router.post("/", validate(createCategorySchema), CategoryController.create);
router.put("/:id", validate(updateCategorySchema), CategoryController.update);
router.delete(
  "/:id",
  validate(deleteCategorySchema),
  CategoryController.delete,
);

export default  router;
