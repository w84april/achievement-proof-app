import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { userState } from "state";
import axios from "axios";
import { useHistory } from "react-router-dom";
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
}) {
  const resultString = ["Победитель", "Призер", "Участник"];
  const [user, setUser] = useRecoilState(userState);
  const history = useHistory();
  const { role } = user;
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
    } catch (err) {
      if (err.response.status === 403) {
        history.push("/auth/signin");
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
    } catch (err) {
      if (err.response.status === 403) {
        history.push("/auth/signin");
      }
    }
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
        <Flex flex={1} maxH={"240px"} justify={"center"}>
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
          <Stack>
            {approved ? (
              <Text fontWeight={600} color={"green.200"} size="sm" mb={4}>
                Подтверждено
              </Text>
            ) : (
              <Text fontWeight={600} color={"red.200"} size="sm" mb={4}>
                Не подтверждено
              </Text>
            )}
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {event}
            </Heading>

            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Команда:{" "}
              <Text as="span" color="gray.500">
                {team}
              </Text>
            </Text>
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
                onClick={() => handeApprove(true)}
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
                onClick={() => handeApprove(false)}
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
              width={"100%"}
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
