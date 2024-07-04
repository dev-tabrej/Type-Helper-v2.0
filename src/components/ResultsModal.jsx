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

const ResultsModal = ({
  isOpen,
  onClose,
  correctWords,
  incorrectWords,
  totalKeystrokes,
  correctKeystrokes,
  initialTime,
  onRestart,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent maxW="600px" bg={"black"}>
      <ModalHeader textAlign="center" color="white">
        Typing Results
      </ModalHeader>
      <Results
        correctWords={correctWords}
        incorrectWords={incorrectWords}
        totalKeystrokes={totalKeystrokes}
        correctKeystrokes={correctKeystrokes}
        initialTime={initialTime}
      />
      <ModalFooter>
        <Button onClick={onRestart} colorScheme="blue" mr={3}>
          Restart
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ResultsModal;
