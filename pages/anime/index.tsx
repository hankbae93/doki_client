import { NextPage } from "next";
import AnimeList from "@/components/anime/AnimeList";
import PageLayout from "@/layouts/PageLayout";

const AnimePage: NextPage = () => {
  return (
    <PageLayout title="EXPLORE">
      <AnimeList />
    </PageLayout>
  );
};

export default AnimePage;
