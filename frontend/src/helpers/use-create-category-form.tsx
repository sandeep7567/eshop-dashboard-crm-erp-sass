import * as z from "zod"

const createCategoryFormSchema = z.object({
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
})

export default createCategoryFormSchema;