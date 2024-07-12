import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import Results from "./Results";
import { useRecoilValue } from "recoil";
import { practiceTypeAtom } from "../atom/filterAtom";
import useShowToast from "../hooks/useToast";
import { userAtom } from "../atom/userAtom";

const ResultsModal = ({
  isOpen,
  onClose,
  correctWords,
  incorrectWords,
  totalKeystrokes,
  correctKeystrokes,
  initialTime,
  onRestart,
}) => {
  const practiceType = useRecoilValue(practiceTypeAtom);
  const toast = useShowToast();
  const user = useRecoilValue(userAtom);

  const accuracy =
    totalKeystrokes === 0 ? 0 : (correctKeystrokes / totalKeystrokes) * 100;
  const wpm =
    ((correctWords.length + incorrectWords.length) / initialTime) * 60;

  const saveResult = async () => {
    if (!user) {
      toast("Login To save", "Please log in to save your results");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/users/postresults`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accuracy,
          wpm,
          practiceType,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        toast("Success", data.message, "success");
      } else {
        toast("Error", data.error, "error");
      }
    } catch (error) {
      toast("Error", error.message, "error");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="600px" bg={"black"}>
        <ModalHeader textAlign="center" color="white">
          Typing Results
        </ModalHeader>
        <Results
          accuracy={accuracy}
          wpm={wpm}
          correctWords={correctWords}
          incorrectWords={incorrectWords}
          totalKeystrokes={totalKeystrokes}
          correctKeystrokes={correctKeystrokes}
          initialTime={initialTime}
        />
        <ModalFooter>
          <Button
            onClick={() => {
              saveResult(), onRestart();
            }}
            colorScheme="blue"
            mr={3}
          >
            Restart
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              saveResult(), onClose();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResultsModal;
