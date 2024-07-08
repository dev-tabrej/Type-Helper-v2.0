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
        // border={"2px solid "}
        boxShadow={"0px 0px 5px blue"}
        borderRadius={10}
      />
      <Text
        fontSize={"3xl"}
        position={"fixed"}
        top={340}
        color={"white"}
        fontWeight={"500"}
        textShadow={"1px 1px 4px blue"}
      >
        Place Your fingers like this for better speed.
      </Text>
    </>
  );
}

export default GuideImage;
