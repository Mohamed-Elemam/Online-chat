import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export const useRegister = () => {
  const navigate = useNavigate();

  const inputSchema = z.object({
    username: z
      .string()
      .min(3, "name must be more than 3 characters")
      .max(10, "name can not exceed 10 characters")
      .trim(),
    email: z.string().email("enter valid email").trim(),
    password: z.string().min(6, "name must be more than 5 characters").trim(),
  });

  type inputsType = z.infer<typeof inputSchema>;

  const resolver = zodResolver(inputSchema);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<inputsType>({
    mode: "onChange",
    resolver,
  });

  const { setUserState } = useContext(AuthContext);
  const handleRegister: SubmitHandler<inputsType> = async (values) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_LIVE_API_URL}/user/register`,
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
      toast.success("Register completed");

      navigate("/chat");
    } catch (error: unknown) {
      axios.isAxiosError(error) && toast.error(error.response?.data.error);
    }
  };
  return { handleSubmit, register, errors, isSubmitting, handleRegister };
};
