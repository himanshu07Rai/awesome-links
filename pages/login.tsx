import { useRouter } from "next/router";

import React, { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

const Login = ({ session }) => {
  // const { data: session } = useSession();
  console.log(session);
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

    // toast.success(data.message);

    cookie.set("token", data.token);
    console.log(JSON.stringify(data?.User));

    cookie.set("user", JSON.stringify(data?.User));
    router.push("/");

    setEmail("");
    setPassword("");
  };

  const logoutHandler = async () => {
    if (session) {
      signOut();
    }
    cookie.remove("token");
    cookie.remove("user");
  };

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={logoutHandler}>Sign out</button>
      </>
    );
  }
  return (
    <>
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
    </>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
