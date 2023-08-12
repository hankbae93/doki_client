import AuthLayout from "@/layouts/auth-layout";
import SignIn from "@/components/auth/SignIn";
import { NextPage } from "next";

const SignInPage: NextPage = () => {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
};

export default SignInPage;
