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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { ViewIcon, ViewOffIcon, AttachmentIcon } from "@chakra-ui/icons";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userState } from "../../../../state/index";
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
export const ModalAddProductContent = () => {
  const [user, setUser] = useRecoilState(userState);
  const token = localStorage.getItem("token");
  const toast = useToast();

  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
  const onSubmit = handleSubmit(async (data) => {
    console.log("On Submit: ", data);
    try {
      const { productName, quantity, price, uploaded_file } = data;
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("uploaded_file", uploaded_file[0]);

      const achievement = await axios({
        method: "post",
        url: "/product",
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      console.log(achievement);
      if (achievement.status === 200) {
        toast({
          title: "Продукт добавлен",
          status: "success",
          isClosable: true,
          position: "bottom-left",
        });
      }
    } catch (err) {
      if (err.response.status === 403) {
        history.push("/auth/signin");
        toast({
          title: "Вы не авторизованы",
          status: "error",
          isClosable: true,
          position: "bottom-left",
        });
      } else {
        toast({
          title: "Не удалось добавить товар",
          status: "error",
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  });
  return (
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
              <FormControl id="productName" isRequired>
                <FormLabel>Название товара</FormLabel>
                <Input type="text" {...register("productName")} />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="quantity" isRequired>
                <FormLabel>Количество</FormLabel>
                <NumberInput max={100} min={0}>
                  <NumberInputField id="quantity" {...register("quantity")} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="price" isRequired>
            <FormLabel>Цена</FormLabel>
            <NumberInput max={100} min={0}>
              <NumberInputField id="price" {...register("price")} />
            </NumberInput>
          </FormControl>

          <FormControl id="file" isRequired>
            <FormLabel>Загрузите фото</FormLabel>
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
  );
};
