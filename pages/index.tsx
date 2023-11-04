import type { NextPage } from "next";
import AnimeList from "@/components/anime/AnimeList";
import PageLayout from "@/layouts/PageLayout";

const Home: NextPage = () => {
  return (
    <PageLayout title="애니메이션 리스트">
      <AnimeList />
    </PageLayout>
  );
};

export default Home;
