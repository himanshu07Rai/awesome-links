export default function Component() {
  return <h1>HOME</h1>;
}

// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });
//   console.log(session);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/api/auth/signin",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       session,
//     },
//   };
// }
