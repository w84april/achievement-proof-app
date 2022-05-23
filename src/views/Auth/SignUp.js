// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "state";
function SignUp() {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const history = useHistory();
  const [user, setUser] = useRecoilState(userState);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  axios.defaults.baseURL = process.env.REACT_APP_API;

  //Todo: Rework with Formik
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      fatherName: e.target[2].value,
      email: e.target[3].value,
      password: e.target[4].value,
    };
    try {
      const user = await axios({
        method: "post",
        url: "/signup",
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

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        borderRadius={{ md: "15px" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={BgSignUp}
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
      ></Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="6.5rem"
        mb="30px"
      >
        <Text fontSize="4xl" color="white" fontWeight="bold">
          Добро пожаловать
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
        >
          Создайте аккаунт, чтобы иметь возможность подтвердить свои достижения
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "100px" }}
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        >
          <form onSubmit={onSubmit}>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Имя
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="text"
                placeholder="Введите ваше имя"
                mb="24px"
                size="lg"
                id="firstName"
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Фамилия
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="text"
                placeholder="Введите вашу фамилию"
                mb="24px"
                size="lg"
                id="lastName"
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Отчество
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="text"
                placeholder="Введите ваше отчество"
                mb="24px"
                size="lg"
                id="fatherName"
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Электронная почта
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="email"
                placeholder="Ваш адрес электронной почты"
                mb="24px"
                size="lg"
                id="email"
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Пароль
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="password"
                placeholder="Ваш пароль"
                mb="24px"
                size="lg"
                id="password"
              />
              <Button
                type="submit"
                bg="teal.300"
                fontSize="14px"
                color="white"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
              >
                Зарегистрироваться
              </Button>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Stack color={textColor} fontWeight="medium" direction={"row"}>
                <Text>Уже есть аккаунт?</Text>
                <NavLink to="/auth/signin" ms="5px" fontWeight="bold">
                  <Text color={titleColor}>Войдите</Text>
                </NavLink>
              </Stack>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;
