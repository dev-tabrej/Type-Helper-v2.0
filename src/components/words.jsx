import React, { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import commonEnglishWords from "../hooks/commonWords";
import programmingKeywords from "../hooks/programmingWords";

const Words = ({ practiceType }) => {
  // Initialize words based on practiceType
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [correctWords, setCorrectWords] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);

  useEffect(() => {
    // Fetch words based on practiceType
    if (practiceType === "common") {
      setWords(commonEnglishWords);
    } else if (practiceType === "programming") {
      setWords(programmingKeywords);
    }

    // Event listener for keydown
    const handleKeyDown = (event) => {
      if (event.key === " ") {
        event.preventDefault(); // Prevent default space bar action (scrolling)
        if (typedWord.trim() === words[currentWordIndex]) {
          setCorrectWords((prev) => [...prev, typedWord.trim()]);
        } else {
          setIncorrectWords((prev) => [...prev, typedWord.trim()]);
        }

        setTypedWord("");
        setCurrentWordIndex((prevIndex) => prevIndex + 1);

        // Check if the next word index is at the end of the current line
        if ((currentWordIndex + 1) % wordsPerLine === 0) {
          // setCurrentWordIndex((prevIndex) => prevIndex + 1);
          setCurrentLineIndex((prevIndex) => prevIndex + 1);
        }
      } else if (event.key.length === 1 || event.key === "Backspace") {
        setTotalKeystrokes((prev) => prev + 1);
        setTypedWord((prev) =>
          event.key === "Backspace" ? prev.slice(0, -1) : prev + event.key
        );
        if (
          event.key !== "Backspace" &&
          typedWord.length < words[currentWordIndex]?.length
        ) {
          if (event.key === words[currentWordIndex][typedWord.length]) {
            setCorrectKeystrokes((prev) => prev + 1);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentWordIndex, typedWord, words]);

  // Calculate the number of words to display per line
  const wordsPerLine = 5;

  // Calculate the indices for the first and second lines
  const firstLineIndex = currentLineIndex * wordsPerLine;
  const secondLineIndex = (currentLineIndex + 1) * wordsPerLine;

  // Slice the words array to display the first and second lines
  const firstLineWords = words.slice(
    firstLineIndex,
    firstLineIndex + wordsPerLine
  );
  const secondLineWords = words.slice(
    secondLineIndex,
    secondLineIndex + wordsPerLine
  );

  // Function to get the color of each letter
  const getLetterColor = (letter, index) => {
    if (index < typedWord.length) {
      return letter === typedWord[index] ? "green" : "red";
    }
    return "skyblue";
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin={8}
    >
      {/* Display the first line of words */}
      <Text style={{ marginBottom: "10px" }} fontSize="2.5rem" color="skyblue">
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
        color="gray.500"
      >
        {secondLineWords.map((word, index) => (
          <span key={index} style={{ marginRight: "10px" }}>
            {word}
          </span>
        ))}
      </Text>

      {/* Display the typed word */}
      <Text
        marginTop="20px"
        textAlign="center"
        width="fit-content"
        height={10}
        fontSize="2rem"
        color="yellow"
      >
        {typedWord}
      </Text>

      {/* Display correct and incorrect words */}
    </Flex>
  );
};

export default Words;
