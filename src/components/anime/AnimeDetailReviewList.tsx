import React, { Fragment } from "react";
import useAnimeQuery from "@/src/hooks/queries/useAnimeQuery";
import { Avatar, Divider, Grid, List, Rating } from "@mui/material";

const AnimeDetailReviewList = () => {
  const { data } = useAnimeQuery();

  return (
    <List>
      {data?.anime.reviews.map((review) => {
        return (
          <Fragment key={review.id}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" src={review.user?.profile} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                  {review.user?.nickname}
                </h4>
                <p style={{ textAlign: "left" }}>{review.content}</p>
                <Rating
                  name="평점"
                  value={review.score}
                  precision={0.5}
                  readOnly
                />
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted 1 minute ago
                </p>
              </Grid>
            </Grid>
            <Divider />
          </Fragment>
        );
      })}
    </List>
  );
};

export default AnimeDetailReviewList;
