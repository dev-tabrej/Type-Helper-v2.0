import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useColorModeValue,
  Spinner,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [inputs, setInputs] = useState([{ password: "", username: "" }]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <Stack
      minH={"100%"}
      w={"full"}
      direction={{ base: "column", md: "row" }}
      // bg={"yellow"}
      justify={"center"}
      mt={10}
    >
      <Flex
        p={12}
        h={"500px"}
        // bg={"blue"}
        w={"500px"}
        borderRadius={"10px"}
        align={"center"}
        justify={"center"}
        boxShadow={"dark-lg"}
      >
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              onChange={(e) => {
                setInputs((inputs) => ({
                  ...inputs,
                  username: e.target.value,
                }));
              }}
              value={inputs.username}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setInputs((inputs) => ({
                    ...inputs,
                    password: e.target.value,
                  }));
                }}
                value={inputs.password}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.500"}>Forgot password?</Link>
            </Stack>
            <Button
              colorScheme={"blue"}
              loadingText="Logging in."
              variant={"solid"}
            >
              Sign in
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Don't have an Account?{" "}
              <Link color={"blue.400"} onClick={() => navigate("/signup")}>
                SignUp
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
