import AuthLayout from "@/layouts/auth-layout";
import SignUp from "@/app/auth/signUp/SignUp";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
};

export default RegisterPage;
