// Chakra imports
import {
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
  Input,
  Button,
  Divider,
  useToast,
  Box,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useState } from "react";
import { ProductAddToCart } from "views/Dashboard/Billing/components/Product";
import Web3 from "web3";
import axios from "axios";
const ProfileInformation = ({
  title,
  description,
  firstName,
  lastName,
  fatherName,
  role,
  email,
  addAddress,
  address,
  products,
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const [typedAddress, setTypedAddress] = useState("");
  const toast = useToast();
  const token = localStorage.getItem("token");
  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: "/address",
        headers: {
          Authorization: token,
        },
        data: { address: typedAddress },
      });

      toast({
        title: "Адрес добавлен",
        status: "success",
        isClosable: true,
        position: "bottom-left",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Не удалось добавить адрес",
        status: "error",
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
      <CardHeader p="12px 5px" mb="12px">
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          {title}
        </Text>
      </CardHeader>
      <CardBody px="5px">
        <Flex direction="column">
          <Text fontSize="md" color="gray.500" fontWeight="400" mb="30px">
            {description}
          </Text>
          {firstName && (
            <Flex align="center" mb="18px">
              <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
                Имя:{" "}
              </Text>
              <Text fontSize="md" color="gray.500" fontWeight="400">
                {firstName}
              </Text>
            </Flex>
          )}
          {lastName && (
            <Flex align="center" mb="18px">
              <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
                Фамилия:{" "}
              </Text>
              <Text fontSize="md" color="gray.500" fontWeight="400">
                {lastName}
              </Text>
            </Flex>
          )}
          {fatherName && (
            <Flex align="center" mb="18px">
              <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
                Отчество:{" "}
              </Text>
              <Text fontSize="md" color="gray.500" fontWeight="400">
                {fatherName}
              </Text>
            </Flex>
          )}
          {email && (
            <Flex align="center" mb="18px">
              <Text
                fontSize="md"
                as="span"
                color={textColor}
                fontWeight="bold"
                me="10px"
              >
                Адрес эл. почты:{" "}
              </Text>
              <Text fontSize="md" color="gray.500" fontWeight="400">
                {email}
              </Text>
            </Flex>
          )}
          {role && (
            <Flex align="center" mb="18px">
              <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
                Роль:{" "}
              </Text>
              <Text fontSize="md" color="gray.500" fontWeight="400">
                {role}
              </Text>
            </Flex>
          )}
          {address && (
            <Flex align="center" mb="18px">
              <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
                Адрес:{" "}
              </Text>
              <Text fontSize="md" color="gray.500" fontWeight="400">
                {address}
              </Text>
            </Flex>
          )}
          <Divider />
          {addAddress && (
            <>
              <Input
                borderRadius="15px"
                placeholder="Введите ваш Ethereum адрес"
                size="sm"
                id="password"
                mt={6}
                onChange={(e) => setTypedAddress(e.target.value)}
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
                disabled={!Web3.utils.isAddress(typedAddress)}
                onClick={handleAddAddress}
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
              >
                Добавить
              </Button>
            </>
          )}
          {products &&
            products.map((product, i) => <Box key={i}>{product[0]}</Box>)}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ProfileInformation;
