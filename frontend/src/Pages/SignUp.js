import { Button } from "@mui/material";
import React, { useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/AuthContext";
export default function SignUp({ login }) {
  const password = useRef();
  const passwordAgain = useRef();
  const username = useRef();
  const email = useRef();
  const navigate = useNavigate();
  const {  dispatch } = useContext(AuthContext);

  const handleClickAnother = () => {
    login ? navigate("/signup") : navigate("/login");
  };

  const handlClick = async (e) => {
    e.preventDefault();
    const cond = passwordAgain?.current
      ? password.current?.value !== passwordAgain.current.value
      : false;
    if (cond) {
      password.current?.setCustomValidity("Password Does Not Match");
    } else {
      const user = {
        username: username?.current?.value || "",
        email: email?.current?.value || "",
        password: password?.current?.value || "",
      };
      try {
        if (!login) {
          await axios.post("/api/auth/register", user);

          navigate("/login");
        } else {
          dispatch({ type: "LOGIN_START" });
          try {
            const res = await axios.post("/api/auth/login", {
              email: email.current.value,
              password: password.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate("/");
          } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const LoginContent = () => (
    <>
      <div className="flex h-screen w-screen bg-[#f0f2f5] justify-center items-center">
        <div className=" flex flex-col justify-center mr-10 ">
          <h3 className="text-[blue] font-bold text-3xl mb-2">AnonySocia</h3>
          <span className="text-black">
            Connect with your friend and world around you using AnonySocia
          </span>
        </div>
        <form
          type="submit"
          className="flex flex-col w-4/12 p-3 justify-center  rounded-xl bg-white space-y-5 "
        >
          {!login ? (
            <input
              type="text"
              className="w-full p-2 h-10 rounded-md border focus:outline-none  border-zinc-500"
              placeholder="Username"
              minLength='3'
              required
              ref={username}
            />
          ) : null}
          <input
            type="email"
            className="w-full p-2 h-10 rounded-md border focus:outline-none border-zinc-500"
            placeholder="Email"
            minLength='3'
            required
            ref={email}
          />
          <input
            type="password"
            className="w-full p-2 h-10 rounded-md border focus:outline-none border-zinc-500"
            placeholder="Password"
            minLength="6"
            required
            ref={password}
          />
          {!login ? (
            <input
              type="password"
              className="w-full p-2 h-10 rounded-md border focus:outline-none border-zinc-500"
              placeholder="Password Again"
              minLength="6"
              required
              ref={passwordAgain}
            />
          ) : null}
          <Button
            type="submit"
            onClick={handlClick}
            variant="contained"
            color="primary"
          >
            {login ? <p>Login</p> : <p>Sign up</p>}
          </Button>
          {login ? <span>Forget Password ?</span> : null}
          <Button
            onClick={handleClickAnother}
            variant="contained"
            color="success"
          >
            {login ? <p>Create a New Account</p> : <p>Login into Account</p>}
          </Button>
        </form>
      </div>
    </>
  );
  return (
    <div>
      <LoginContent />
    </div>
  );
}
