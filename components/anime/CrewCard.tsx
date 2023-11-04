import React from "react";
import CardHeader from "@mui/material/CardHeader";
import { Link } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import DefaultImg from "@/assets/default_img.png";
import Card from "@mui/material/Card";
import { CrewListData } from "@/api/anime/anime.response";
import { RoutePath } from "@/constants/route";

const CrewCard = ({ id, name, thumbnail }: CrewListData) => {
  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardHeader title={name} sx={{ padding: "16px", textAlign: "center" }} />
      <Link href={RoutePath.CREW + `/${id}`}>
        <a>
          <CardMedia
            component="img"
            height="194"
            image={thumbnail || DefaultImg.src}
            alt={name}
          />
        </a>
      </Link>
    </Card>
  );
};

export default CrewCard;
