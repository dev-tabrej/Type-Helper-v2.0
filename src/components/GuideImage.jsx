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
        boxShadow={"dark-lg"}
        borderRadius={10}
      />
      <Text
        fontSize={"2xl"}
        position={"fixed"}
        top={340}
        color={"white"}
        fontWeight={"500"}
        textShadow={"1px 1px 4px red"}
      >
        Place Your fingers like this for better speed.
      </Text>
    </>
  );
}

export default GuideImage;
