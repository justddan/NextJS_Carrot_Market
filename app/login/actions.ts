"use server";

import { redirect } from "next/navigation";

export async function handleForm(prevState: any, formData: FormData) {
  console.log(prevState);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  redirect("/");
  return {
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
    errors: ["wrong password", "password too short"],
  };
}
