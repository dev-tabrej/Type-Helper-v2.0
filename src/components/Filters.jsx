import { Box, Button, Flex, FormLabel, Select, Text } from "@chakra-ui/react";
import React from "react";
import { LuClock3 } from "react-icons/lu";

function Filters() {
  return (
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      mt={2}
      p={2}
      boxShadow={"0px 2px 4px black"}
    >
      <Text fontSize={"2xl"} p={"20px 0 10px 0"} fontWeight={"bold"}>
        Choose The type of Practice and time
      </Text>
      <Flex justify={"space-around"} w={"full"} mx={10}>
        <Flex align={"center"} gap={2}>
          <Select
            w={200}
            border={"none"}
            _hover={{ border: "none" }}
            bg={"rgba(0, 0 ,0, 0.6)"}
          >
            <option value="1">Select Type</option>
            <option value="2">Type 1</option>
            <option value="3">Type 2</option>
          </Select>
        </Flex>
        <Flex
          align={"center"}
          justify={"center"}
          gap={2}
          bg={"rgba(0, 0 ,0, 0.6)"}
          pl={2}
          borderRadius={10}
        >
          <LuClock3 size={"20px"} p={2} mx={2} />
          <Select
            w={200}
            border={"none"}
            // bg={"rgba(0, 0 ,0, 0.6)"}
            _hover={{ border: "none" }}
          >
            <option value="1">Select Time</option>
            <option value="2">1 min</option>
            <option value="3">2 min</option>
            <option value="4">3 min</option>
          </Select>
        </Flex>
      </Flex>
      <Button
        onClick={"handleClick"}
        width="200px"
        color={"grey"}
        fontSize="larger"
        mt={10}
        _hover={{ color: "skyblue", bg: "rgba(0, 0 ,0, 0.6)" }}
      >
        Start
      </Button>
    </Flex>
  );
}

export default Filters;
