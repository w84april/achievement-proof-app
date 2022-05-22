import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
  Box,
  bgColor,
  Icon,
} from "@chakra-ui/react";

export default function Project({
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
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");

  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "640px" }}
        direction={"column"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex flex={1} bg="blue.200">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={`${process.env.REACT_APP_API}/image/${file}`}
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
            {/* <Box p="24px" bg={bgColor} my="22px" borderRadius="12px">
              <Flex justify="space-between" w="100%">
                <Flex direction="column" maxWidth="70%">
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Company Name:{" "}
                    <Text as="span" color="gray.500">
                      {team}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Email Address:{" "}
                    <Text as="span" color="gray.500">
                      {projectName}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    VAT Number:{" "}
                    <Text as="span" color="gray.500">
                      {ownerLastName} {ownerFirstName} {ownerFatherName}
                    </Text>
                  </Text>
                </Flex>
              </Flex>
            </Box> */}

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
            >
              Отклонить
            </Button>
          </Stack>
          {/* <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
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
            >
              Удалить
            </Button>
          </Stack> */}
        </Stack>
      </Stack>
    </Center>
  );
}
