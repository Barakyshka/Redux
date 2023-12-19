import { useState } from "react";
import { z } from "zod";
import { Link, Navigate } from "react-router-dom";
import { regUser } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { setUserErrors, signup } from "../redux/users/action";
export const Signup = () => {
  const dispatch = useDispatch();
  const { loading, errors, user } = useSelector((state) => state.user);
  console.log(user);
  console.log(errors);
  const [values, setValues] = useState({
    email: "",
    password: "",
    repeatedPassword: "",
  });

  const handlerChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handlerSubmit = async () => {
    try {
      const { repeatedPassword, ...user } = regUser.parse({
        ...values,
        createdAt: Date.now(),
      });
      dispatch(signup(user));
    } catch (error) {
      if (error instanceof z.ZodError) dispatch(setUserErrors(error.format()));
    }
  };

  if (loading) return <div className="text-blue-500">Loading...</div>;
  
  if (user?.id) return <Navigate to="/" replace />;
  return (
    <div className="flex flex-col w-2/4 mx-auto gap-3 text-2xl">
      <h1 className="text-5xl text-center">Sign up</h1>
      <input
        type="text"
        placeholder="Email"
        className="border-2 border-black py-2 px-3"
        name="email"
        value={values.email}
        onChange={handlerChange}
      />
      {errors?.email && (
        <div className="text-red-500">{errors?.email?._errors}</div>
      )}
      <input
        type="password"
        placeholder="Password"
        className="border-2 border-black py-2 px-3"
        name="password"
        value={values.password}
        onChange={handlerChange}
      />
      {errors?.password && (
        <div className="text-red-500">
          Пароль должен содержать 8 символов, цифры, заглавные и строчные буквы
        </div>
      )}
      <input
        type="password"
        placeholder="Repeat password"
        className="border-2 border-black py-2 px-3"
        name="repeatedPassword"
        value={values.repeatedPassword}
        onChange={handlerChange}
      />

      {errors?.repeatedPassword && (
        <div className="text-red-500">{errors?.repeatedPassword?._errors}</div>
      )}

      {errors?.message && <div className="text-red-500">{errors?.message}</div>}

      <div className="flex justify-between mt-5">
        <button
          className="border-2 border-black px-2 py-1 text-3xl"
          onClick={handlerSubmit}
        >
          Sign up
        </button>
        <Link to="/login" className="self-center underline">
          Log in
        </Link>
      </div>
    </div>
  );
};
