import React from "react";
import { Flex, Select, Text, Button } from "@chakra-ui/react";
import { LuClock3 } from "react-icons/lu";
import { useRecoilState } from "recoil";
import { startState } from "../atom/StartAtom";
import { time, practiceType } from "../atom/filterAtom";

function Filters() {
  const [start, setStart] = useRecoilState(startState);
  const [selectedPracticeType, setPracticeType] = useRecoilState(practiceType); // Renamed to avoid naming conflict
  const [selectedTime, setTime] = useRecoilState(time); // Renamed to avoid naming conflict
  console.log(selectedPracticeType, selectedTime);
  return (
    <Flex
      direction="column"
      w="full"
      justify="center"
      align="center"
      mt={2}
      p={2}
      boxShadow="0px 2px 4px black"
    >
      <Text fontSize="2xl" p="20px 0 10px 0" fontWeight="bold">
        Choose the type of Practice and time
      </Text>
      <Flex justify="space-around" w="full" mx={10}>
        <Flex align="center" gap={2}>
          <Select
            w={200}
            border="none"
            bg="rgba(0, 0, 0, 0.9)"
            onChange={(e) => {
              setPracticeType(e.target.value);
            }}
          >
            <option value="common">Common</option>
            <option value="programming">Programming</option>
          </Select>
        </Flex>
        <Flex
          align="center"
          justify="center"
          gap={2}
          bg="rgba(0, 0, 0, 0.9)"
          pl={4}
          borderRadius={10}
        >
          <LuClock3 size={20} />
          <Select
            w={176}
            border="none"
            onChange={(e) => {
              switch (e.target.value) {
                case "1":
                  setTime(60);
                  break;
                case "2":
                  setTime(120);
                  break;
                case "3":
                  setTime(300);
                  break;
                default:
                  setTime(60);
              }
            }}
          >
            <option value="1">1 min</option>
            <option value="2">2 min</option>
            <option value="3">5 min</option>
          </Select>
        </Flex>
      </Flex>
      <Button
        width="150px"
        fontSize="larger"
        mt={10}
        onClick={() => {
          setStart(!start);
          console.log(start);
        }}
        _hover={{ color: "skyblue", bg: "rgba(0, 0, 0, 0.9)" }}
      >
        Start
      </Button>
    </Flex>
  );
}

export default Filters;
