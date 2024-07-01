import { Avatar, Box, Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import React from "react";

function ProfilePage() {
  const array = [1, 2, 3, 4, 5, 6];
  return (
    <Flex w={"full"} mx={5} gap={2}>
      <Flex
        direction={"column"}
        align={"center"}
        flex={20}
        borderRight={"2px solid black"}
        p={2}
      >
        <Avatar size={"2xl"} />
        <Text fontSize={"2xl"} m={2}>
          Tabrej
        </Text>
      </Flex>
      <Flex flex={80} direction={"Column"}>
        <Flex
          // flex={100}
          height={100}
          fontWeight={"bolder"}
          fontSize={"xl"}
          justify={"space-around"}
          align={"center"}
          border={"2px solid black"}
          mx={5}
        >
          <Text>S No</Text>
          <Text>Typing type</Text>
          <Text>Accuracy</Text>
          <Text>WPM</Text>
        </Flex>
        {array.map((i) => (
          <Flex
            key={i}
            // flex={100}
            height={100}
            justify={"space-around"}
            align={"center"}
            border={"2px solid black"}
            mx={5}
          >
            <Text>{i}</Text>
            <Text>Typing type</Text>
            <Text>Accuracy</Text>
            <Text>WPM</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

export default ProfilePage;
