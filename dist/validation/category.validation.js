import * as Yup from "yup";
export const getByIdCategorySchema = Yup.object({
    id: Yup.string().required(),
});
export const createCategorySchema = Yup.object({
    name: Yup.string().required().label("Name"),
    description: Yup.string().label("Description"),
});
export const updateCategorySchema = Yup.object({
    id: Yup.string().required(),
    name: Yup.string().required().label("Name"),
    description: Yup.string().label("Description"),
});
export const deleteCategorySchema = Yup.object({
    id: Yup.string().required(),
});
//# sourceMappingURL=category.validation.js.map