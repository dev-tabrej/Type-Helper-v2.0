import { useState } from "react";
import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";
import Homepage from "./pages/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
    <Container maxW={{ base: "620px", md: "full" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Container>
  );
}

export default App;
