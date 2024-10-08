import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import "../index.css";
import { startState } from "../atom/StartAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import GuideImage from "../components/GuideImage";
import Keypad from "./../components/Keypad";
import Words from "../components/words";
import { practiceTypeAtom, time } from "../atom/filterAtom";
function Homepage() {
  const start = useRecoilValue(startState);
  const practicetype = useRecoilValue(practiceTypeAtom);
  // const selectedTime = useRecoilValue(time);
  return (
    <Flex direction={"column"}>
      {!start ? (
        <Flex justify={"center"}>
          <Filters />
          <GuideImage />
        </Flex>
      ) : (
        <Flex justify={"center"}>
          <Words practiceType={practicetype} />
          <Keypad />
        </Flex>
      )}
    </Flex>
  );
}

export default Homepage;
