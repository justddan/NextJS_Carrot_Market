"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useActionState, useState } from "react";
import { uploadProduct } from "./action";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  //   const [uploadUrl, setUploadUrl] = useState("");
  //   const [imageId, setImageId] = useState("");
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;

    console.log(files);

    const file = files[0];

    // Check image
    if (!file.type.startsWith("image/")) {
      console.log("please upload image");
      return;
    }
    // Check image size
    const maxSizeMB = 3;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      console.log(
        `${file.size} size too big! size should be less than ${maxSizeMB}`
      );
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    // const { success, result } = await getUploadUrl();

    // if (success) {
    //   const { id, uploadURL } = result;
    //   setUploadUrl(uploadURL);
    //   setImageId(id);
    // }
  };
  //   const interceptAction = async (_: any, formData: FormData) => {
  //     const file = formData.get("photo");
  //     if (!file) return;

  //     const cloudflareForm = new FormData();
  //     cloudflareForm.append("file", file);

  //     const response = await fetch(uploadUrl, {
  //       method: "POST",
  //       body: cloudflareForm,
  //     });

  //     if (response.status !== 200) return;

  //     const photoUrl = `https://imagedelivery.net/abcdefghijklmnopqrstuvwxyz/${imageId}`;
  //     formData.set("photo", photoUrl);

  //     return uploadProduct(_, formData);
  //   };
  //   const [state, dispatch] = useActionState(interceptAction, null);
  const [state, dispatch] = useActionState(uploadProduct, null);
  return (
    <div>
      <form action={dispatch} className="p-5 flex flex-col gap-5 ">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed bg-center bg-cover"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요.
              </div>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
          defaultValue={state?.photo}
        />
        <Input
          name="title"
          required
          placeholder="제목"
          type="text"
          defaultValue={state?.title}
          errors={state?.errors?.fieldErrors.title}
        />
        <Input
          name="price"
          required
          placeholder="가격"
          type="number"
          defaultValue={state?.price}
          errors={state?.errors?.fieldErrors.price}
        />
        <Input
          name="description"
          required
          placeholder="자세한 설명"
          type="text"
          defaultValue={state?.description}
          errors={state?.errors?.fieldErrors.description}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}

// 유저가 이미지 올렸는지 확인
// 이미지 사이즉 5MB 이하인지 확인
