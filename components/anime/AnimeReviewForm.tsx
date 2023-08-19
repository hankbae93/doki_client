import React, { FormEventHandler, useState } from "react";
import { Button, Rating, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";

const AnimeReviewForm = () => {
  const [comment, setComment] = useState("");
  const [score, setScore] = useState(0);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Rating
        name="평점"
        value={score}
        onChange={(event, newValue) => {
          setScore(newValue as number);
        }}
      />

      <TextField
        label="Leave a comment"
        variant="outlined"
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button type="submit" variant="contained" endIcon={<Send />}>
        Submit
      </Button>
    </form>
  );
};

export default AnimeReviewForm;
