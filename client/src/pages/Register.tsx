import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const inputSchema = z.object({
    username: z.string().min(3, "name must be more than 3 characters").trim(),
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
    console.log(values);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/user/register",
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
      // console.error(error?.response?.data.error);
      axios.isAxiosError(error) && toast.error(error.response?.data.error);
    }
  };

  return (
    <>
      <div className=" py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
            Register
          </h2>
          <ToastContainer />
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="mx-auto max-w-lg rounded-lg border"
          >
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                  Name
                </label>
                <input
                  {...register("username", { required: true })}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
                {errors.username && errors.username.message && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
              </div>
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
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  {...register("password", { required: true })}
                />
                {errors.password && errors.password.message && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <button
                disabled={isSubmitting}
                className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
              >
                Register
              </button>
            </div>

            <div className="flex items-center justify-center bg-gray-100 p-4">
              <p className="text-center text-sm text-gray-500">
                Already have an account?
                <Link
                  to="/login"
                  className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;