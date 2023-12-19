import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/users/action";
const Login = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "a@mail.ru",
    password: "Aa111111",
  });
  const { errors, loading, user } = useSelector((state) => state.user);
  console.log(user);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    dispatch(login(values));
  };
  
  if(loading) return <div className="text-blue-500">Loading...</div>

  if (user?.id) return <Navigate to="/" replace />;
  return (
    <div className="flex flex-col w-2/4 mx-auto gap-3 text-2xl">
      <h1 className="text-5xl text-center">Log in</h1>
      <input
        type="text"
        placeholder="Email"
        className="border-2 border-black py-2 px-3"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        className="border-2 border-black py-2 px-3"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      {errors?.message && <div className="text-red-500">{errors?.message}</div>}
        <div className="flex justify-between mt-5">
          <button
            className="border-2 border-black px-2 py-1 text-3xl"
            onClick={handleLogin}
          >
            Log in
          </button>
          <Link to="/signup" className="self-center underline">
            Sign up
          </Link>
        </div>
    </div>
  );
};

export default Login;
