import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { AuthContext } from "../Contexts/AuthProvider";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState('');
  const [token] = useToken(loginUserEmail)
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.form?.pathname || '/'

  if(token){
    navigate(from, {replace: true})
  }
  const handleLogin = (e) => {
    console.log(e);
    setLoginError("");
    signIn(e.email, e.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginUserEmail(e.email)
        
      })
      .catch((err) => {
        console.log(err.message);
        setLoginError(err.message);
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center my-20">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <h2 className="text-center text-xl font-bold">Login</h2>
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
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
          {loginError && <p className="text-red-600">{loginError}</p>}
          <Link className="text-sm">Forget Password?</Link>
        </div>
        <input
          className="btn btn-accent w-full mt-5"
          type="submit"
          value="login"
        />
        <p className="mt-5">
          New to Doctors Portal?
          <Link to="/register" className="text-secondary">
            Create new account
          </Link>
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </form>
    </div>
  );
};

export default Login;
