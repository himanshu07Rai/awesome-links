import Link from "next/link";
import { signIn, getSession, useSession } from "next-auth/react";
import nookies from "nookies";
import { useEffect, useState } from "react";

export default function Component({ user }) {
  return (
    <>
      <h1>{`HOME ${user}`}</h1>
      <Link href="/login">Login</Link>
    </>
  );
}

export async function getServerSideProps(context) {
  console.log(context, " context");

  const session = await getSession(context);
  // console.log(session, "  session");
  const cookies = nookies.get(context);
  // console.log(cookies, "  cookies");

  const user = cookies?.user
    ? JSON.parse(cookies.user).email
    : session?.user
    ? session?.user.email
    : "";

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {
      user,
    },
  };
}
