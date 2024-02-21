import { useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "../components/forms/LoginForm/LoginForm";
import { useEffect } from "react";
import { useAuth } from "../lib/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { user } = useAuth();

  useEffect(() => {
    if (pathname === "/login" && user.id) {
      navigate("/");
    }
  });

  return (
    <div>
      <LoginForm />
    </div>
  );
};
export default LoginPage;
