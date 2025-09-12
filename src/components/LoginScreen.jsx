import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useLoginUser from "../Api/hooks/mutations/useLogin";
import loginBg from "../assets/images/loginBg.jpg";

// Validation schema with Yup
const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginScreen = ({onLogin}) => {

  const { mutateAsync } = useLoginUser();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("Submitting login:", values);

      const response = await mutateAsync(values);

      const user = {
        userType: response?.data?.data?.role,
        employeeID: response?.data?.data?.userID,
      };

      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Logged In Successfully");
      resetForm();
      onLogin();
      navigate("/summary");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <img
          src={loginBg}
          alt="Background"
          className="w-full h-full object-cover object-center"
          onError={(e) => (e.target.style.display = "none")}
        />
        <div className="absolute inset-0" />
      </div>

      {/* Login Form */}
      <div className="relative z-10 h-full flex items-center justify-end pr-8 sm:pr-12 md:pr-20 lg:pr-30">
        <div className="w-full max-w-[400px] bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 sm:p-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                fill="#333"
              />
              <path d="M8 10h8v2H8z" fill="#333" />
              <path d="M10 8h2v8h-2z" fill="#333" />
            </svg>
            <span className="text-2xl font-semibold text-gray-800 tracking-tight">
              MixBowls
            </span>
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-6 mb-8">
                {/* Username */}
                <div className="relative">
                  <Field
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full px-5 py-4 border border-gray-300 rounded-full text-base bg-white shadow-lg focus:outline-none focus:border-gray-800"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full px-5 py-4 border border-gray-300 rounded-full text-base bg-white shadow-lg focus:outline-none focus:border-gray-800"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-5 py-4 bg-gray-800 text-white rounded-full font-semibold tracking-wider shadow-lg hover:bg-gray-700 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Demo Credentials */}
          {/* <div className="text-center text-xs text-gray-500 font-normal mb-4">
            <p className="mb-1">Demo Credentials:</p>
            <p className="font-mono bg-gray-100 px-2 py-1 rounded">
              Username: admin | Password: admin
            </p>
          </div> */}

          {/* <div className="text-center text-xs text-gray-500 font-normal">
            ©2020 MixBowls LLD.
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
