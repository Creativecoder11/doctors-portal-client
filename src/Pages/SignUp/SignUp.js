import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
import toast from "react-hot-toast";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { createUser, updateUser } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();

  

  const handleRegister = (e) => {
    console.log(e);
    setSignUpError("");
    createUser(e.email, e.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast("User Registration Successful!");
        const userInfo = {
          displayName: e.name,
        };
        updateUser(userInfo).then(() => {});
        navigate("/")
        
      })
      .catch((err) => {
        console.log(err);
        setSignUpError(err.message);
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center my-20">
      <form onSubmit={handleSubmit(handleRegister)}>
        <div>
          <h2 className="text-center text-xl font-bold">Sign Up</h2>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Name</span>{" "}
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-600">{errors.name?.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>{" "}
            </label>
            <input
              type="text"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Password</span>{" "}
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password should be 6 letter" },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message: "Password Should Be Strong",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
          <Link className="text-sm" to="/register">
            Forget Password?
          </Link>
        </div>
        <input
          className="btn btn-accent w-full mt-5"
          type="submit"
          value="Sign Up"
        />
        {signUpError && <p className="text-red-600">{signUpError}</p>}
        <p className="mt-5">
          Already Sign in?
          <Link to="/login" className="text-secondary">
            Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </form>
    </div>
  );
};

export default SignUp;
