import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register the required elements and plugins for Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const Results = ({
  accuracy,
  wpm,
  correctWords,
  incorrectWords,
  totalKeystrokes,
  correctKeystrokes,
  initialTime,
}) => {
  const data = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        data: [correctKeystrokes, totalKeystrokes - correctKeystrokes],
        backgroundColor: ["#4CAF50", "#F44336"],
        hoverBackgroundColor: ["#66BB6A", "#EF5350"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <Flex direction={"column"} alignItems={"center"} width={600} zIndex={10}>
      <Box
        bg="black"
        p={8}
        borderRadius="lg"
        shadow="md"
        width="100%"
        // my={2}
        position="relative"
      >
        <Flex justifyContent="center" alignItems="center" height="300px">
          <Box width="50%">
            <Doughnut data={data} options={options} />
            <Text
              position="absolute"
              top="60%"
              left="36%"
              transform="translate(-50%, -50%)"
              fontSize="2xl"
              fontWeight="bold"
              color="white"
            >
              {wpm} WPM
            </Text>
          </Box>
          <Flex direction="column" justifyContent="center" ml={8}>
            <Text fontSize="lg" color="green.500">
              Correct words: {correctWords.length}
            </Text>
            <Text fontSize="lg" color="red.500">
              Incorrect words: {incorrectWords.length}
            </Text>
            <Text fontSize="lg" color="Skyblue">
              Accuracy: {accuracy.toFixed(2)}%
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Results;
