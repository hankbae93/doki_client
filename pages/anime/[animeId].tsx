import { NextPage } from "next";
import { useRouter } from "next/router";

const AnimeDetailPage: NextPage = () => {
  const { animeId } = useRouter().query;

  return <div>{animeId}</div>;
};

export default AnimeDetailPage;
