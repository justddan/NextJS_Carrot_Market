import { redirect } from "next/navigation";
import db from "./db";

export const deleteProduct = async (id: number) => {
  await db.product.delete({
    where: {
      id,
    },
  });
  redirect("/products");
};
