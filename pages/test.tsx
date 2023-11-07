import React, { ChangeEventHandler, useState } from "react";
import { Button, Stack } from "@mui/material";
import api from "@/api";
import { toast } from "react-toastify";

const MyComponent = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.currentTarget;
    if (files === null || !files[0]) return;

    const formData = new FormData();
    // @ts-ignore
    for (const file of files) {
      formData.append("file", file);
    }

    setFile(file);

    toast.promise(
      () => api.post("/image/upload", formData),
      {
        pending: "Review Pending...",
        success: "Review Updated 👌",
        error: "Review rejected 🤯",
      },
      {
        position: "bottom-center",
      },
    );
  };

  return (
    <form encType="multipart/form-data">
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="upload-image">
          <Button variant="contained" component="span">
            썸네일 업로드
          </Button>
          <input
            id="upload-image"
            hidden
            multiple
            accept="image/*"
            type="file"
            onChange={handleFileUpload}
          />
        </label>
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded Image"
            height="300"
          />
        )}
      </Stack>

      <button></button>
    </form>
  );
};

export default MyComponent;
