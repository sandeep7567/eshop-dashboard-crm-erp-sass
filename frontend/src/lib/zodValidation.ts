import { z } from "zod";

const userSchema = z.object({
  email: z.string().email("wrong email format"),
  password: z.string().min(8, "Password needs to be atleast 8 charakters long")
});

type userSchema = z.infer<typeof userSchema>;

export { userSchema };