import { Avatar, Box, Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import React from "react";

function ProfilePage() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Flex w={"full"} borderRadius={5} mt={5}>
      {/* Profile view Flex */}
      <Flex
        direction={"column"}
        align={"center"}
        borderRadius={5}
        flex={20}
        mx={4}
        height={400}
        boxShadow={"0px 0px 10px black"}
        p={10}
      >
        <Avatar size={"2xl"} />
        <Text fontSize={"2xl"} m={2}>
          Tabrej
        </Text>
        <Flex direction={"column"} mt={10} justify={"center"} align={"center"}>
          <Text>Your Personal Best</Text>
          <Box>
            <Text>Typing type</Text>
            <Text>Accuracy</Text>
            <Text>WPM</Text>
          </Box>
        </Flex>
      </Flex>
      <Flex
        flex={80}
        direction={"column"}
        mx={2}
        borderRadius={5}
        maxHeight={"full"}
        boxShadow={"0px 0px 10px black"}
      >
        {/* Past practice results  */}
        <Flex
          height={20}
          fontWeight={"bolder"}
          fontSize={"xl"}
          justify={"space-around"}
          align={"center"}
          // border={"1px solid black"}
          boxShadow={"0 0 20px black"}
        >
          <Text>S No</Text>
          <Text>Typing type</Text>
          <Text>Accuracy</Text>
          <Text>WPM</Text>
        </Flex>
        <Box
          overflowY={"scroll"}
          maxHeight={550}
          mt={2}
          pb={2}
          boxShadow={"dark-lg"}
          bg={"grey.800"}
        >
          {array.map((i) => (
            <Flex
              key={i}
              height={20}
              justify={"space-around"}
              align={"center"}
              // border={"2px solid black"}
              boxShadow={"dark-lg"}
              bg={"rgba(20,80,100,0.05)"}
              borderRadius={2}
              m={2}
              color={"skyblue"}
            >
              <Text>{i}</Text>
              <Text>Programming</Text>
              <Text>88.37 %</Text>
              <Text>28</Text>
            </Flex>
          ))}
        </Box>
      </Flex>
    </Flex>
  );
}

export default ProfilePage;
