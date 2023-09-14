import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { UserContext } from "./Hooks/AuthContext";


export default function SignUp() {
  const { setUserEmail, setname } = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [name, setnamee] = useState("");
  const [password, setPassword] = useState("");
  const [errorsMessage, seterrorsMessage] = useState("");

  const loginHandler = () => {
    console.log("Login button clicked");
    console.log(email);
    console.log(password);
    console.log(name);
    axios
      .post("http://localhost:8080/signup", {
        email: email,
        password: password,
        name: name
      })
      .then(function (response) {
        console.log(response);
        setUserEmail(email);
        setname(name);
        navigate("/Home");
      })
      .catch(function (error) {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          // Handle error response with a message
          seterrorsMessage(error.response.data.message);
        } else {
          // Handle other errors
          seterrorsMessage("An error occurred while logging in.");
        }
      });
  };

  return (
    <div>
      <h1 className="ml-[600px]">Instagram</h1>
      <h1 className="ml-[630px] mt-5">Sign Up</h1>

      <div>
        {errorsMessage && (
          <div className="ml-[550px] mt-10 text-red-500">errorsMessage</div>
        )}
        <label class=" mb-2 ml-[550px] mt-7 block text-sm font-medium text-gray-900 dark:text-white">
          Enter Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setnamee(e.target.value);
          }}
          class="ml-[550px] block w-60 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Name@gmail.com"
          required
        />

        <label class=" mb-2 ml-[550px] mt-7 block text-sm font-medium text-gray-900 dark:text-white">
          Enter Email
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
          class="ml-[550px] block w-60 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Name@gmail.com"
          required
        />
        <label class=" mb-2 ml-[550px] mt-5 block text-sm font-medium text-gray-900 dark:text-white">
          Enter Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          class="ml-[550px] block w-60 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="......."
          required
        />
        <p class="ml-[50px] gap-2 text-center text-slate-600">
          Alredy have an account?
          <a
            class="cursor-pointer font-semibold text-slate-900 hover:text-primary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign In
          </a>
        </p>
        <button
          type="submit"
          onClick={loginHandler}
          class="mb-2 ml-[700px] mr-2 mt-5 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
