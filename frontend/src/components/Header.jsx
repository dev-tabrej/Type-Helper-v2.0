import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { FaRegKeyboard } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import useShowToast from "../hooks/useToast";
import { useRecoilState } from "recoil";
import { userAtom } from "../atom/userAtom";
import Login from "./Login";
import url from "../hooks/url";

function Header() {
  const [user, setUser] = useRecoilState(userAtom);
  const { pathname } = useLocation();
  const toast = useShowToast();
  console.log(pathname);
  const handelLogout = async () => {
    try {
      const res = await fetch(`${url}/users/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        toast("Error: ", data.error, "error");
        return;
      }
      toast("Logged Out", "user logged out successfully", "success");
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      toast("Error: ", error, "error");
    }
  };
  return (
    <Flex justify="space-between" align="center" padding="2px 20px">
      <Link to="/">
        <FaRegKeyboard size="50px" style={{ cursor: "pointer" }} />
      </Link>

      <Text
        fontSize="xl"
        fontWeight="bold"
        fontFamily="Playwrite US Trad, cursive"
      >
        Type Partner
      </Text>

      <Flex justify="center" align="center" gap={2}>
        <Link to="/profile">
          <RxAvatar size="30px" style={{ cursor: "pointer" }} />
        </Link>

        {!user ? (
          pathname !== "/login" ? (
            <Button as={Link} to="/login" size="sm">
              Login
            </Button>
          ) : (
            <Button as={Link} to="/signup" size="sm">
              Sign up
            </Button>
          )
        ) : (
          <Button as={Link} to="/" size="sm" onClick={handelLogout}>
            Logout
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
export default Header;
