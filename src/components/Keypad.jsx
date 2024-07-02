import { Flex, Box, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

function Keypad() {
  const [highlightedKey, setHighlightedKey] = useState("");
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key === " " ? "Space" : event.key;
      if (key === "Shift") {
        setIsShiftPressed(true);
      } else {
        setHighlightedKey(key);
        setTimeout(() => setHighlightedKey(""), 200); // Remove highlight after 200ms
      }
    };

    const handleKeyUp = (event) => {
      const key = event.key === " " ? "Space" : event.key;
      if (key === "Shift") {
        setIsShiftPressed(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const rows = [
    [
      "`",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
      "Backspace",
    ],
    ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
    [
      "CapsLock",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      ";",
      "'",
      "Enter",
    ],
    [
      "LeftShift",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "/",
      "RightShift",
    ],
    ["Space"],
  ];

  const keyWidths = {
    Backspace: "100px",
    Tab: "70px",
    CapsLock: "90px",
    Enter: "100px",
    LeftShift: "120px",
    RightShift: "120px",
    Space: "full",
  };

  return (
    <Flex
      direction="column"
      justifyContent={"center"}
      p={5}
      border={"5px solid crimson"}
      borderRadius={10}
      margin={2}
      maxWidth={"90%"}
      position={"fixed"}
      bottom={10}
    >
      {rows.map((row, rowIndex) => (
        <Flex
          key={rowIndex}
          mb={2}
          justifyContent={"space-between"}
          width={"full"}
        >
          {row.map((key) => (
            <Box
              key={key}
              m={1}
              p={2}
              width={keyWidths[key] || "60px"}
              textAlign="center"
              bg={highlightedKey === key ? "rgb(3, 129, 239)" : "gray.200"}
              borderRadius="md"
            >
              <Text color={"black"}>
                {isShiftPressed && key.length === 1 ? key.toUpperCase() : key}
              </Text>
            </Box>
          ))}
        </Flex>
      ))}
    </Flex>
  );
}

export default Keypad;
