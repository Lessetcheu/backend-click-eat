import * as Yup from "yup";
export const getByIdProductSchema = Yup.object({
    id: Yup.string().required(),
});
export const createProductSchema = Yup.object({
    name: Yup.string().required().label("Name"),
    price: Yup.number().required().label("Price"),
    categoryId: Yup.string().required().label("Category"),
    shortDescription: Yup.string().required().label("Short description"),
    longDescription: Yup.string().label("Long description").nullable(),
    // image: Yup.string().required().label("Image"),
});
export const updateProductSchema = Yup.object({
    id: Yup.string().required(),
    name: Yup.string().required().label("Name"),
    price: Yup.number().required().label("Price"),
    categoryId: Yup.string().required().label("Category"),
    shortDescription: Yup.string().required().label("Short description"),
    longDescription: Yup.string().label("Long description").nullable(),
    // image: Yup.string().required().label("Image"),
});
export const deleteProductSchema = Yup.object({
    id: Yup.string().required(),
});
//# sourceMappingURL=product.validation.js.map