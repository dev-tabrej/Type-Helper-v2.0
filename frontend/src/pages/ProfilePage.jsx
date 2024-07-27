import { Avatar, Box, Flex, Text, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useShowToast from "../hooks/useToast";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atom/userAtom";
import { Doughnut } from "react-chartjs-2";
import url from "../hooks/url";

function ProfilePage() {
  const [results, setResults] = useState([]);
  const [bestResult, setBestResult] = useState({
    accuracy: 0,
    wpm: 0,
    practiceType: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useShowToast();
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const getResults = async () => {
      setLoading(true);
      if (!user) {
        setLoading(false);
        return;
      }
      const token=localStorage.getItem('token')
      try {
        const res = await fetch(`${url}/users/results`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" ,"Authorization":`Bearer ${token}`},

        });
        const data = await res.json();
        setResults(data);

        if (data.length > 0) {
          // Find the best result based on highest WPM, then accuracy
          const best = data.reduce((max, result) => {
            if (result.wpm > max.wpm) {
              return result;
            }
            if (result.wpm === max.wpm && result.accuracy > max.accuracy) {
              return result;
            }
            return max;
          }, data[0]);
          setBestResult(best);
        }
      } catch (error) {
        toast("Error", "Failed to fetch practice results", "error");
      } finally {
        setLoading(false);
      }
    };
    getResults();
  }, [user]);
  const data = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        data: [bestResult ? bestResult.accuracy : 0, 100 - bestResult.accuracy],
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
    <Flex w={"full"} borderRadius={5} mt={5}>
      {/* Profile view Flex */}
      <Flex direction={"column"} gap={5} flex={20} mx={4} minW={250}>
        <Flex
          direction={"column"}
          align={"center"}
          borderRadius={5}
          boxShadow={"0px 0px 10px black"}
          p={10}
        >
          <Avatar size={"2xl"} />
          <Text fontSize={"2xl"} m={2} textTransform={"capitalize"}>
            {user ? user.name : "Guest"}
          </Text>
          <Text fontSize={"large"} m={2} color={"grey"} mt={-2}>
            {user ? `@${user.username}` : "@Guest"}
          </Text>
        </Flex>
        <Flex
          direction={"column"}
          maxH={"300px"}
          align={"center"}
          borderRadius={10}
          boxShadow={"dark-lg"}
          p={2}
        >
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Your Personal Best
          </Text>
          {bestResult && (
            <Box h={40} w={40} mb={3} position={"relative"}>
              <Doughnut data={data} options={options} />
              <Text
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, 30%)"
                fontSize={"xl"}
              >
                {`${bestResult.wpm} wpm`}
              </Text>
            </Box>
          )}
          <Box>
            <Text>
              Practice Type: {user && bestResult ? bestResult.practiceType : ""}
            </Text>
            <Text>
              Accuracy:{" "}
              {user && bestResult ? bestResult.accuracy.toFixed(2) : 0}%
            </Text>
            <Text>WPM: {user && bestResult ? bestResult.wpm : 0}</Text>
          </Box>
        </Flex>
      </Flex>
      <Flex
        flex={80}
        direction={"column"}
        mx={2}
        minW={400}
        borderRadius={5}
        maxHeight={"full"}
        boxShadow={"0px 0px 10px black"}
      >
        {/* Past practice results  */}
        <Flex
          height={20}
          fontWeight={"bolder"}
          fontSize={"xl"}
          justify={"space-around"}
          align={"center"}
          boxShadow={"0 0 20px black"}
        >
          <Text>S No</Text>
          <Text>Typing type</Text>
          <Text>Accuracy</Text>
          <Text>WPM</Text>
        </Flex>
        <Box
          overflowY={"scroll"}
          mt={2}
          pb={2}
          h={550}
          boxShadow={"dark-lg"}
          bg={"grey.800"}
        >
          {loading ? (
            <Flex w={"full"} h={"full"} justify={"center"} align={"center"}>
              <Spinner size={"xl"} />
            </Flex>
          ) : results.length > 0 ? (
            results.map((result, index) => (
              <Flex
                key={result._id}
                height={20}
                justify={"space-around"}
                align={"center"}
                boxShadow={"dark-lg"}
                bg={"rgba(20,80,100,0.05)"}
                borderRadius={2}
                m={2}
                color={"white"}
              >
                <Text>{index + 1}</Text>
                <Text>{result.practiceType}</Text>
                <Text>{result.accuracy.toFixed(2)}%</Text>
                <Text>{result.wpm}</Text>
              </Flex>
            ))
          ) : (
            <Flex justifyContent={"center"} align={"center"}>
              <Text mt={20} fontSize={30}>
                No results to show
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

export default ProfilePage;
