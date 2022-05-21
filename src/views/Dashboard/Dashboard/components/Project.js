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
} from "@chakra-ui/react";

export default function Project() {
  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "540px" }}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex flex={1} bg="blue.200">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={
              "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
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
            <Text fontWeight={600} color={"red.200"} size="sm" mb={4}>
              Не подтверждено
            </Text>
            {/* <Text fontWeight={600} color={"green.200"} size="sm" mb={4}>
              Подтверждено
            </Text> */}
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              Hackaton Cyber Garden 2020
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              Barbariki
            </Text>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              Полиенко Даниил Викторович
            </Text>
            <Text fontWeight={400} size="sm" mb={4}>
              Победитель
            </Text>
          </Stack>
          <Stack
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
