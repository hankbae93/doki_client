import React from "react";
import SignIn from "@/app/auth/signIn/SignIn";
import AuthLayout from "@/layouts/auth-layout";

const SignInPage = () => {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
};

export default SignInPage;
