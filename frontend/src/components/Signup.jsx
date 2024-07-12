import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import useShowToast from "../hooks/useToast";
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const toast = useShowToast();
  const handleSubmit = async () => {
    // Add your signup logic here
    try {
      if (!inputs.password || !inputs.username || !inputs.email) {
        toast("Error", "username ,password and email are required", "error");
      }
      const res = await fetch(`http://localhost:5000/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        toast("Success: ", data.message, "success");
      }
      // toast("Error: ", data.error, "error");
    } catch (error) {
      toast("Error: ", error.message, "error");
    }

    // Navigate to the desired page after successful signup
    navigate("/");
  };

  return (
    <Flex minH={"500px"} align={"center"} justify={"center"} mt={10}>
      <Stack spacing={6} boxShadow={"dark-lg"} borderRadius={10}>
        <Box rounded={"lg"} p={8} fontSize={"xl"}>
          <Stack spacing={4} px={2}>
            <Stack spacing={4} w={"full"} maxW={"xl"}>
              <Heading fontSize={"2xl"} padding={"0 0 10px 0"} my={"5px"}>
                Sign up
              </Heading>
            </Stack>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                    value={inputs.name}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setInputs({ ...inputs, username: e.target.value })
                    }
                    value={inputs.username}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                value={inputs.email}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                  value={inputs.password}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                colorScheme={"blue"}
                variant={"solid"}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} onClick={() => navigate("/login")}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
