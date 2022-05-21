import React, { useState, useEffect } from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
// Assets
import { NavLink, useHistory } from "react-router-dom";
import { userState } from "../../state/index";
import { useRecoilState } from "recoil";
import axios from "axios";

function SignIn() {
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const [user, setUser] = useRecoilState(userState);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const history = useHistory();
  axios.defaults.baseURL = process.env.REACT_APP_API;

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: e.target[0].value,
      password: e.target[1].value,
    };

    try {
      const user = await axios({
        method: "post",
        url: "/login",
        data: formData,
      });

      localStorage.setItem("token", user.data.token);
      setUser(user.data.result);
      setSuccess(true);
      history.push("/");
    } catch (err) {
      setError(err);
      setOpen(true);
    }
  };

  useEffect(() => {
    localStorage.removeItem("token");
    setUser({});
  }, []);

  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="center"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Добро пожаловать
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Введите ваш адрес электронной почты и пароль чтобы авторизоваться
            </Text>
            <form onSubmit={onSubmit}>
              <FormControl isRequired>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Адрес электронной почти
                </FormLabel>
                <Input
                  borderRadius="15px"
                  mb="24px"
                  fontSize="sm"
                  type="email"
                  placeholder="Ваш адрес электронной почты"
                  size="lg"
                  id="email"
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Пароль
                </FormLabel>
                <Input
                  borderRadius="15px"
                  mb="12px"
                  fontSize="sm"
                  type="password"
                  placeholder="Ваш пароль"
                  size="lg"
                  id="password"
                />

                <Button
                  fontSize="14px"
                  type="submit"
                  bg="teal.300"
                  w="100%"
                  h="45"
                  mb="20px"
                  color="white"
                  mt="20px"
                  _hover={{
                    bg: "teal.200",
                  }}
                  _active={{
                    bg: "teal.400",
                  }}
                >
                  Войти
                </Button>
              </FormControl>
            </form>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Stack color={textColor} fontWeight="medium" direction={"row"}>
                <Text>Пока нет аккаута?</Text>
                <NavLink to="/auth/signup" ms="5px" fontWeight="bold">
                  <Text color={titleColor}>Создать аккаунт</Text>
                </NavLink>
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignIn;
