import express from "express";
import categoryRouter from "./category.router.js";
import productRouter from "./product.router.js";
const router = express.Router();
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
export default router;
//# sourceMappingURL=index.js.map