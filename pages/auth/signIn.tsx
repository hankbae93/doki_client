import AuthLayout from "@/src/layouts/auth-layout";
import SignIn from "@/src/components/auth/SignIn";
import { NextPage } from "next";

const SignInPage: NextPage = () => {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
};

export default SignInPage;
