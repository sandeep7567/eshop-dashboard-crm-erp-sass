import * as z from "zod";

const createCategoryFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 2 characters.",
    })
    .max(30, { message: "Title is not more then 30 characters." }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .max(100, { message: "Description is not more then 100 characters." }),

  categoryId: z.string(),
});

export default createCategoryFormSchema;
