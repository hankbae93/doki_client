import React from "react";
import { useUserStore } from "@/src/atoms/user";
import { fetchRemoveScrappedAnime } from "@/src/api/scrap/scrap.api";
import Card from "@mui/material/Card";
import { blue, grey, pink } from "@mui/material/colors";
import { Link } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { servePath } from "@/src/utils/file";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { BookmarkRemove } from "@mui/icons-material";
import ShareIcon from "@mui/icons-material/Share";
import useScrapQuery from "@/src/hooks/queries/useScrapQuery";
import { RoutePath } from "@/src/constants/route";
import { toast } from "react-toastify";

interface ScrapCardProps {
  scrapId: number;
}

const ScrapCard = ({ scrapId }: ScrapCardProps) => {
  const { user } = useUserStore();
  const { refetch, data } = useScrapQuery();

  const scrap = data?.find((data) => data.id === scrapId);

  const handleScrap = async () => {
    if (!user) return;
    await fetchRemoveScrappedAnime(scrapId);
    toast.success("스크랩이 취소되셨습니다.", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
    await refetch();
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 1,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          boxShadow: 3,
          transform: "scale(1.1)",
        },
        backgroundColor: grey[100],
      }}
    >
      <Link href={`${RoutePath.ANIME}/${scrap?.anime.id}`}>
        <CardMedia
          component="img"
          height="194"
          image={servePath(scrap?.anime.thumbnail)}
          alt={scrap?.anime.title}
        />
      </Link>
      <CardHeader
        title={scrap?.anime.title}
        sx={{ bgcolor: blue[500], color: "white", padding: "8px 16px" }}
      />
      <CardContent sx={{ flexGrow: 1, padding: "16px" }}>
        <Typography variant="caption" color="text.secondary">
          원작: {scrap?.anime.source}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mt={1}
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            textOverflow: "ellipsis",
            height: "calc(1.45em * 3)", // Adjust the multiplier to match the line-height of body2 variant
          }}
        >
          {scrap?.anime.description || "소개글이 없습니다."}
        </Typography>
      </CardContent>

      <CardActions
        disableSpacing
        sx={{ justifyContent: "center", padding: "8px" }}
      >
        <IconButton
          aria-label="add to favorites"
          onClick={handleScrap}
          sx={{ margin: "0 8px" }}
        >
          <BookmarkRemove sx={{ color: pink[500] }} />
        </IconButton>
        <IconButton aria-label="share" sx={{ margin: "0 8px" }}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ScrapCard;
