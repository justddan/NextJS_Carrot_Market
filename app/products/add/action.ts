"use server";

export async function uploadProduct(formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };
  console.log(data);

  return {
    photo: data.photo?.toString(),
    title: data.title?.toString(),
    price: data.price?.toString(),
    description: data.description?.toString(),
  };
}
