import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const inputSchema = z.object({
  email: z.string().email("enter valid email").trim(),
  password: z.string().min(6, "password must be more than 5 characters").trim(),
});

type inputsType = z.infer<typeof inputSchema>;

const resolver = zodResolver(inputSchema);

export const useLogin = () => {
  const { setUserState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<inputsType> = useCallback(
    async (values) => {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/user/login",
          values
        );

        if (setUserState) {
          const userData = {
            username: data.user.username,
            userId: data.user._id,
            email: data.user.email,
            token: data.token,
          };
          setUserState(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
        toast.success("Login complete");

        navigate("/chat");
      } catch (error: unknown) {
        axios.isAxiosError(error) && toast.error(error.response?.data.error);
      }
    },
    [setUserState, navigate]
  );

  const handleDemoLogin1 = () => {
    const loginData = {
      email: import.meta.env.VITE_DEMO_EMAIL1,
      password: import.meta.env.VITE_DEMO_PASSWORD1,
    };
    handleLogin(loginData);
  };
  const handleDemoLogin2 = () => {
    const loginData = {
      email: import.meta.env.VITE_DEMO_EMAIL2,
      password: import.meta.env.VITE_DEMO_PASSWORD2,
    };
    handleLogin(loginData);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<inputsType>({
    mode: "onChange",
    resolver,
  });

  return {
    handleSubmit,
    register,
    errors,
    isSubmitting,
    handleLogin,
    handleDemoLogin1,
    handleDemoLogin2,
  };
};
