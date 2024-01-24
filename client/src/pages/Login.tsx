import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const inputSchema = z.object({
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
  const navigate = useNavigate();
  const handleLogin: SubmitHandler<inputsType> = async (values) => {
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
      // console.error(error?.response?.data.error);
      axios.isAxiosError(error) && toast.error(error.response?.data.error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <ToastContainer />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
            Login
          </h2>

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="mx-auto max-w-lg rounded-lg border"
          >
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
                {errors.email && errors.email.message && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  {...register("password", { required: true })}
                />
                {errors.password && errors.password.message && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
              >
                Log in
              </button>
              <div className="relative flex items-center justify-center">
                <span className="absolute inset-x-0 h-px bg-gray-300"></span>
                <span className="relative bg-white px-4 text-sm text-gray-400">
                  Log in with demo account
                </span>
              </div>
              <button
                disabled={isSubmitting}
                className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
              >
                Login with Demo account no.1
              </button>
              <button
                disabled={isSubmitting}
                className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
              >
                Login with Demo account no.2
              </button>
            </div>

            <div className="flex items-center justify-center bg-gray-100 p-4">
              <p className="text-center text-sm text-gray-500">
                Don't have an account?
                <Link
                  to="/register"
                  className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;