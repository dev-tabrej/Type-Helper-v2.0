import React from "react";
import keyboard from "../images/keyboard.png";
import { Image, Text } from "@chakra-ui/react";

function GuideImage() {
  return (
    <>
      <Image
        src={keyboard}
        width={600}
        position={"fixed"}
        bottom={10}
        opacity={0.7}
        border={"2px solid red"}
        borderRadius={10}
      />
      <Text
        fontSize={"2xl"}
        position={"fixed"}
        top={340}
        color={"white"}
        fontWeight={"500"}
      >
        Place Your fingers like this for better speed.
      </Text>
    </>
  );
}

export default GuideImage;
