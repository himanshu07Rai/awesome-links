import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import { useRouter } from "next/router";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
// import router from "next/router";

export default function ButtonAppBar() {
  const [userState, setUserState] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const cookies = parseCookies();
  console.log(cookies);
  // console.log(JSON.parse(cookies.user));

  const user = cookies?.user
    ? JSON.parse(cookies.user).email
    : session?.user
    ? session?.user.email
    : "";

  // console.log(session);

  // console.log(user);

  useEffect(() => {
    setUserState(user);
  }, [userState]);

  const logoutHandler = async () => {
    if (session) {
      signOut();
    }
    cookie.remove("token");
    cookie.remove("user");
    setUserState("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user && user}
          </Typography>
          {!user ? (
            <>
              <Link href="/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link href="/register">
                <Button color="inherit">Register</Button>
              </Link>
            </>
          ) : (
            <Button color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
