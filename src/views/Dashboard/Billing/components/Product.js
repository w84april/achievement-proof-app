import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useWeb3 } from "hooks/use-web3";
import Big from "big.js";
import axios from "axios";

export const ProductAddToCart = ({
  productName,
  file,
  quantity,
  price,
  id,
}) => {
  const { contract, account } = useWeb3();
  const token = localStorage.getItem("token");
  const handleBuy = async () => {
    try {
      await contract.methods
        .buyProduct(
          Big(price)
            .mul(10 ** 18)
            .toFixed(),
          id
        )
        .send({ from: account, gas: 4700000, gasPrice: 8000000000 });
      await axios({
        method: "patch",
        url: "/buy",
        headers: {
          Authorization: token,
        },
        params: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
          src={`${process.env.REACT_APP_API}/image/${file}`}
          alt="product-img"
          roundedTop="lg"
          maxW={200}
          margin={"0 auto"}
          mt={4}
        />

        <Box p="4">
          <Flex
            mt="1"
            justifyContent="space-between"
            minW={200}
            alignItems="center"
          >
            <Box
              fontSize="sm"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {productName}
            </Box>
            {quantity && (
              <IconButton onClick={handleBuy}>
                <Icon as={FiShoppingCart} h={4} w={4} alignSelf={"center"} />
              </IconButton>
            )}
          </Flex>

          <Flex justifyContent="space-between" alignItems="center">
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="lg">
                {price} SFEDU
              </Box>
            </Box>
            {quantity && (
              <Box fontSize="lg" color={useColorModeValue("gray.800", "white")}>
                <Box as="span" color={"black"} fontSize="sm">
                  {quantity} шт.
                </Box>
              </Box>
            )}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};
