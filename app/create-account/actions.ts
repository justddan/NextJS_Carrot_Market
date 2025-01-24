"use server";
import { z } from "zod";

const checkUsername = (username: string) => !username.includes("potato");

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string",
        required_error: "Username is required",
      })
      .min(3, "Way too shor!!")
      .max(10, "That is too Longggg!")
      .refine(checkUsername, "No Potato"),
    email: z.string().email(),
    password: z.string().min(10),
    confirm_password: z.string().min(10),
  })
  .refine(checkPassword, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = formSchema.safeParse(data);

  return {
    username: data.username?.toString(),
    email: data.email?.toString(),
    password: data.password?.toString(),
    confirm_password: data.confirm_password?.toString(),
    errors: result.error?.flatten(),
  };
}
