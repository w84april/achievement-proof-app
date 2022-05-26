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
  useColorModeValue,
  Link,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { ViewIcon, ViewOffIcon, AttachmentIcon } from "@chakra-ui/icons";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userState } from "../../../state/index";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API;
import { useHistory } from "react-router-dom";
const FileUpload = (props) => {
  const { register, accept, multiple, children } = props;
  const inputRef = useRef();
  const { ref, ...rest } = register;

  const handleClick = () => inputRef.current?.click();
  console.log("here");

  return (
    <InputGroup onClick={handleClick}>
      <input
        type={"file"}
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <>{children}</>
    </InputGroup>
  );
};

export default function SignupCard() {
  const [user, setUser] = useRecoilState(userState);
  const token = localStorage.getItem("token");
  const toast = useToast();

  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log("On Submit: ", data);
    try {
      const { name, team, event, result, uploaded_file } = data;
      const formData = new FormData();
      formData.append("projectName", name);
      formData.append("team", team);
      formData.append("event", event);
      formData.append("result", result);
      formData.append("uploaded_file", uploaded_file[0]);
      formData.append("owner", user.id);
      console.log("token", token);
      const achievement = await axios({
        method: "post",
        url: "/achievement",
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      console.log(achievement);
      if (achievement.status === 200) {
        toast({
          title: "Заявка создана",
          status: "success",
          isClosable: true,
          position: "bottom-left",
        });
      }
    } catch (err) {
      if (err.response.status === 403 || !err.response.status) {
        history.push("/auth/signin");
        toast({
          title: "Вы не авторизованы",
          status: "error",
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  });

  const validateFiles = (value) => {
    if (value.length < 1) {
      return "Files is required";
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;
      if (fsMb > MAX_FILE_SIZE) {
        return "Max file size 10mb";
      }
    }
    return true;
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Добавить достижение
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Достижение будет отмечено как подтвержденное после одобрения
            администраницей
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form method="post" onSubmit={onSubmit} encType="multipart/form-data">
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="project" isRequired>
                    <FormLabel>Название проекта</FormLabel>
                    <Input type="text" {...register("name")} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="team">
                    <FormLabel>Название команды</FormLabel>
                    <Input name="team" type="text" {...register("team")} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="event" isRequired>
                <FormLabel>Мероприятие</FormLabel>
                <Input name="event" type="text" {...register("event")} />
              </FormControl>
              <FormControl id="result" isRequired>
                <FormLabel>Результат</FormLabel>
                <Select
                  id="result"
                  placeholder="Результат"
                  size="md"
                  {...register("result")}
                >
                  <option value="0">Победитель</option>
                  <option value="1">Призер</option>
                  <option value="2">Участник</option>
                </Select>
              </FormControl>
              <FormControl id="file" isRequired>
                <FormLabel>Загрузите сертификат</FormLabel>
                <FileUpload
                  accept={"image/*"}
                  multiple
                  register={register("uploaded_file", {
                    validate: validateFiles,
                  })}
                >
                  <Button leftIcon={<AttachmentIcon />}>Загрузить</Button>
                </FileUpload>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  type="submit"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Добавить
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
