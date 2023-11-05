import { NextPage } from "next";
import CreateAnimeForm from "@/components/create/CreateAnimeForm";
import PageLayout from "@/layouts/PageLayout";

const AnimeCreatePage: NextPage = () => {
  return (
    <PageLayout title="애니메이션 등록">
      <CreateAnimeForm />
    </PageLayout>
  );
};

export default AnimeCreatePage;
