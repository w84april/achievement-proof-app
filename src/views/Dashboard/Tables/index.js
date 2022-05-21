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
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { ViewIcon, ViewOffIcon, AttachmentIcon } from "@chakra-ui/icons";
import { useForm, UseFormRegisterReturn } from "react-hook-form";

const FileUpload = (props) => {
  const { register, accept, multiple, children } = props;
  const inputRef = useRef();
  const { ref, ...rest } = register;

  const handleClick = () => inputRef.current?.click();

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
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [project, setProject] = useState("");
  const [team, setTeam] = useState("");
  const [event, setEvent] = useState("");
  const [result, setResult] = useState("");
  const onSubmit = handleSubmit((data) => {
    console.log("On Submit: ", data);
    console.log(project, team, event, result);
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
            Добавить проект
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Проект будет отмечен как подтвержденный после одобрения
            администраницей
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={onSubmit}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="project" isRequired>
                    <FormLabel>Название проекта</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => setProject(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="team">
                    <FormLabel>Название команды</FormLabel>
                    <Input
                      name="team"
                      type="text"
                      onChange={(e) => setTeam(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="event" isRequired>
                <FormLabel>Мероприятие</FormLabel>
                <Input
                  name="event"
                  type="email"
                  onChange={(e) => setEvent(e.target.value)}
                />
              </FormControl>
              <FormControl id="result" isRequired>
                <FormLabel>Результат</FormLabel>
                <Select
                  id="result"
                  placeholder="Результат"
                  size="md"
                  onChange={(e) => setResult(e.target.value)}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <FormControl id="file" isRequired>
                <FormLabel>Загрузите сертификат</FormLabel>
                <FileUpload
                  accept={"image/*"}
                  multiple
                  register={register("file_", { validate: validateFiles })}
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
