import { NextPage } from "next";
import CreateAnimeForm from "@/src/components/create/CreateAnimeForm";
import PageLayout from "@/src/layouts/PageLayout";

const AnimeCreatePage: NextPage = () => {
  return (
    <PageLayout title="애니메이션 등록">
      <CreateAnimeForm />
    </PageLayout>
  );
};

export default AnimeCreatePage;
