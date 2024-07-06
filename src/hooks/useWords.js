import { useEffect, useState } from "react";
import commonEnglishWords from "./commonWords";
import programmingKeywords from "./programmingWords";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const filterAndModifyWords = (words) => {
  return words
    .filter((word) => word.length >= 3)
    .map((word) => {
      if (Math.random() > 0.8) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    });
};

const useWords = (practiceType) => {
  const [words, setWords] = useState([]);
  const [typedWord, setTypedWord] = useState("");
  const [correctWords, setCorrectWords] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);

  const handleRestart = () => {
    setCorrectWords([]);
    setIncorrectWords([]);
    setCurrentWordIndex(0);
    setCurrentLineIndex(0);
    setTotalKeystrokes(0);
    setTypedWord("");
    shuffleArray(words);
  };
  useEffect(() => {
    let initialWords = [];
    if (practiceType === "common") {
      initialWords = commonEnglishWords;
    } else if (practiceType === "programming") {
      initialWords = programmingKeywords;
    }
    initialWords = shuffleArray(filterAndModifyWords(initialWords));
    setWords(initialWords);
  }, [practiceType]); // Run only when practiceType changes

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === " ") {
        event.preventDefault();
        if (typedWord.trim() === words[currentWordIndex]) {
          setCorrectWords((prev) => [...prev, typedWord.trim()]);
        } else {
          setIncorrectWords((prev) => [...prev, typedWord.trim()]);
        }

        setTypedWord("");
        setCurrentWordIndex((prevIndex) => prevIndex + 1);

        if ((currentWordIndex + 1) % wordsPerLine === 0) {
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
  }, [currentWordIndex, typedWord, words]); // Depend on the variables used within the effect

  const wordsPerLine = 5;
  const firstLineIndex = currentLineIndex * wordsPerLine;
  const secondLineIndex = (currentLineIndex + 1) * wordsPerLine;

  const firstLineWords = words.slice(
    firstLineIndex,
    firstLineIndex + wordsPerLine
  );
  const secondLineWords = words.slice(
    secondLineIndex,
    secondLineIndex + wordsPerLine
  );

  const getLetterColor = (letter, index) => {
    if (index < typedWord.length) {
      return letter === typedWord[index] ? "green" : "red";
    }
    return "skyblue";
  };

  return {
    words,
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
    wordsPerLine,
    handleRestart,
  };
};

export default useWords;
