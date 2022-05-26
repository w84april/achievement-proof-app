import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  useDisclosure,
  Modal,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { userState } from "state";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useMemo, useState } from "react";
export default function Project({
  id,
  projectName,
  team,
  approved,
  event,
  ownerFirstName,
  ownerLastName,
  ownerFatherName,
  result,
  file,
  onOpen,
  setModalImage,
  setModalUserName,
  setFetchTrigger,
  fetchTrigger,
}) {
  const resultString = ["Победитель", "Призер", "Участник"];
  const [user, setUser] = useRecoilState(userState);
  const history = useHistory();
  const { role } = user;
  const toast = useToast();
  axios.defaults.baseURL = process.env.REACT_APP_API;

  const token = localStorage.getItem("token");
  const handeApprove = async (approved) => {
    try {
      await axios({
        method: "patch",
        url: "/achievement",
        headers: {
          Authorization: token,
        },
        data: {
          id,
          approved,
        },
      });
      toast({
        title: `Успешно ${approved === "1" ? "подтверждено" : "отклонено"}`,
        status: "success",
        isClosable: true,
        position: "bottom-left",
      });
      setFetchTrigger(!fetchTrigger);
    } catch (err) {
      if (err.response.status === 403 || !err.response.status) {
        toast({
          title: "Необходима авторизация",
          status: "error",
          isClosable: true,
          position: "bottom-left",
        });
        history.push("/auth/signin");
      } else {
        toast({
          title: `Ошибка ${approved === "1" ? "подтверждения" : "отклонения"}`,
          status: "error",
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios({
        method: "delete",
        url: "/achievement",
        headers: {
          Authorization: token,
        },
        params: {
          role,
          id,
        },
      });
      toast({
        title: "Успешно удалено",
        status: "success",
        isClosable: true,
        position: "bottom-left",
      });
      setFetchTrigger(!fetchTrigger);
    } catch (err) {
      if (err.response.status === 403 || !err.response.status) {
        toast({
          title: "Необходима авторизация",
          status: "error",
          isClosable: true,
          position: "bottom-left",
        });
        history.push("/auth/signin");
      } else {
        toast({
          title: "Ошибка удаления",
          status: "error",
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  const approveState = useMemo(() => {
    switch (approved) {
      case 1:
        return (
          <Text fontWeight={600} color={"green.200"} size="sm" mb={4}>
            Подтверждено
          </Text>
        );
      case 2:
        return (
          <Text fontWeight={600} color={"red.200"} size="sm" mb={4}>
            Не подтверждено
          </Text>
        );
      case 3:
        return (
          <Text fontWeight={600} color={"gray.400"} size="sm" mb={4}>
            Ожидает подтверждения
          </Text>
        );
    }
  }, [approved]);

  const handleOpenModal = () => {
    setModalImage(`${process.env.REACT_APP_API}/image/${file}`);
    setModalUserName(`${ownerLastName} ${ownerFirstName} ${ownerFatherName}`);
    onOpen();
  };
  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "640px" }}
        maxW={"400px"}
        direction={"column"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
        h="full"
      >
        <Flex
          flex={1}
          maxH={"240px"}
          justify={"center"}
          onClick={handleOpenModal}
          cursor={"pointer"}
        >
          <Image
            objectFit="cover"
            boxSize="100%"
            src={`${process.env.REACT_APP_API}/image/${file}`}
            width="auto"
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-start"
          p={1}
          pt={2}
        >
          <Stack h={"100%"}>
            {approveState}
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {event}
            </Heading>

            {team && (
              <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                Команда:{" "}
                <Text as="span" color="gray.500">
                  {team}
                </Text>
              </Text>
            )}
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Проект:{" "}
              <Text as="span" color="gray.500">
                {projectName}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Участник:{" "}
              <Text as="span" color="gray.500">
                {ownerLastName} {ownerFirstName} {ownerFatherName}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Результат:{" "}
              <Text as="span" color="gray.500">
                {resultString[result]}
              </Text>
            </Text>
          </Stack>
          {role === 1 && (
            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              paddingTop={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"green.400"}
                color={"white"}
                _focus={{
                  bg: "green.500",
                }}
                _hover={{
                  bg: "green.500",
                }}
                onClick={() => handeApprove("1")}
              >
                Подтвердить
              </Button>
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"red.400"}
                color={"white"}
                _hover={{
                  bg: "red.600",
                }}
                _focus={{
                  bg: "red.600",
                }}
                onClick={() => handeApprove("2")}
              >
                Отклонить
              </Button>
            </Stack>
          )}

          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            paddingTop={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"red.400"}
              color={"white"}
              _hover={{
                bg: "red.600",
              }}
              _focus={{
                bg: "red.600",
              }}
              onClick={handleDelete}
            >
              Удалить
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}
