import React, { useState, useEffect } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import useWords from "../hooks/useWords";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { startState } from "../atom/StartAtom";
import useTimer from "../hooks/useTimer";
import ResultsModal from "./ResultsModal"; // Import ResultsModal
import { Navigate } from "react-router-dom";
import { time } from "../atom/filterAtom";

const Words = ({ practiceType }) => {
  const [showResults, setShowResults] = useState(false);
  const start = useRecoilValue(startState);
  const setStart = useSetRecoilState(startState);
  const initialTime = useRecoilValue(time); // Assuming time is in seconds, change as needed

  const {
    typedWord,
    correctWords,
    incorrectWords,
    totalKeystrokes,
    currentWordIndex,
    currentLineIndex,
    correctKeystrokes,
    firstLineWords,
    secondLineWords,
    getLetterColor,
    setTypedWord,
    handleRestart,
    wordsPerLine,
  } = useWords(practiceType);
  const { timeLeft, setTimeLeft } = useTimer(initialTime, start);

  useEffect(() => {
    if (timeLeft === 0) {
      setShowResults(true); // Update showResults state when timeLeft reaches 0
    }
  }, [timeLeft]);

  const handleRestartClick = () => {
    setShowResults(false);
    setTimeLeft(initialTime);
    handleRestart();

    // Reset showResults state when restarting
    // Additional logic for restarting practice if needed
  };
  const handleStop = () => {
    setTimeLeft(initialTime);
    setStart(!start);
  };
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin={8}
    >
      {/* Timer display */}
      <Text fontSize="2rem" fontWeight="bold" color="gray">
        Time left: {timeLeft} seconds
      </Text>

      {start && !showResults ? (
        <>
          {/* Display practice content */}
          <Text
            style={{ marginBottom: "10px" }}
            fontSize="2.5rem"
            color="skyblue"
          >
            {firstLineWords.map((word, wordIndex) => (
              <span
                key={wordIndex}
                style={{
                  marginRight: "10px",
                  color:
                    wordIndex === currentWordIndex % wordsPerLine
                      ? "skyblue"
                      : "grey",
                }}
              >
                {word.split("").map((letter, letterIndex) => (
                  <span
                    key={letterIndex}
                    style={{
                      color:
                        wordIndex === currentWordIndex % wordsPerLine
                          ? getLetterColor(letter, letterIndex)
                          : "inherit",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </Text>

          {/* Display the second line of words */}
          <Text
            style={{ opacity: 0.5, fontSize: "2rem", marginBottom: "10px" }}
            color={"gray.500"}
          >
            {secondLineWords.map((word, index) => (
              <span key={index} style={{ marginRight: "10px" }}>
                {word}
              </span>
            ))}
          </Text>

          {/* Display other practice elements */}
          <Text fontSize={"4xl"} color={"greenyellow"}>
            {typedWord}
          </Text>
          {/* Modify as needed */}
          <Button onClick={handleStop}>stop</Button>
        </>
      ) : (
        <ResultsModal
          isOpen={showResults} // Pass showResults as isOpen prop to ResultsModal
          onClose={() => {
            setShowResults(false);
            setStart(!start);
          }} // Define onClose handler to close modal
          correctWords={correctWords}
          incorrectWords={incorrectWords}
          totalKeystrokes={totalKeystrokes}
          correctKeystrokes={correctKeystrokes}
          initialTime={initialTime}
          onRestart={handleRestartClick} // Pass handleRestart function as onRestart prop
        />
      )}
    </Flex>
  );
};

export default Words;
