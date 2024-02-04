import { NextPage } from "next";
import AnimeList from "@/src/components/anime/AnimeList";
import PageLayout from "@/src/layouts/PageLayout";

const AnimePage: NextPage = () => {
  return (
    <PageLayout title="EXPLORE">
      <AnimeList />
    </PageLayout>
  );
};

export default AnimePage;
