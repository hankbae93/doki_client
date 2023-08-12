import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DefaultImg from "@/assets/default_img.png";
import { Link } from "@mui/material";

export interface AnimeCardProps {
  title: string;
  tag: string;
  description: string;
  thumbnail?: string;
  href?: string;
}

const AnimeCard = ({
  title,
  tag,
  description,
  thumbnail,
  href,
}: AnimeCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={tag}
      />
      <Link href={href}>
        <a>
          <CardMedia
            component="img"
            height="194"
            image={thumbnail || DefaultImg.src}
            alt={title}
          />
        </a>
      </Link>

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description || "소개글이 없습니다."}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default AnimeCard;
