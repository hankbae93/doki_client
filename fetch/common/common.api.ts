import api from "fetch";
import process from "process";

export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await api.post<{ data: { link: string } }>(
    "https://api.imgur.com/3/image",
    formData,
    {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
      },
    },
  );

  return data.data.link;
};
