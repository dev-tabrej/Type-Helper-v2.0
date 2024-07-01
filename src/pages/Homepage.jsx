import { Flex } from "@chakra-ui/react";
import React from "react";
import Filters from "../components/Filters";

function Homepage() {
  return (
    <Flex direction={"column"}>
      <Filters />
    </Flex>
  );
}

export default Homepage;
