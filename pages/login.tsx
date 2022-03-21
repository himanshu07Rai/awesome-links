import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import { signIn, getSession, useSession } from "next-auth/react";

const Login = ({ session }) => {
  // const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cookies = parseCookies();
  console.log(cookies);

  const user = cookies?.user
    ? JSON.parse(cookies.user).email
    : session?.user
    ? session?.user.email
    : "";
  console.log(session);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

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

  console.log(user);

  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
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
  console.log(session);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
