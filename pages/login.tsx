import { useRouter } from "next/router";

import React, { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/login",
      { email, password },
      config
    );
    console.log(data);

    toast.success(data.message);

    cookie.set("token");
    cookie.set("token", data.token);
    cookie.set("user", JSON.stringify(data?.user));
    router.push("/");

    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
