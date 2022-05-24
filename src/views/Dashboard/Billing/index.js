// Chakra imports
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  useColorModeValue,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
// Assets
import { useRecoilState } from "recoil";
import { userState } from "state";
import React from "react";
import { ProductAddToCart } from "./components/Product";
import { ModalAddProductContent } from "./components/ModalAddProductContent";
import { useGetProducts } from "../../../hooks/use-get-products";
function Billing() {
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const { products, isLoading } = useGetProducts();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useRecoilState(userState);
  const { role } = user;
  console.log(role);
  console.log(products);
  return (
    <Flex direction="column" pt={100} pl={8}>
      {/* <Box bg={bgColor} my="22px" borderRadius="12px">
        <Text p="24px">
          Для работы с этой страницей необходимо расширение Metamask.
        </Text>
      </Box> */}
      {role === 1 && (
        <Box>
          <Button
            colorScheme="teal"
            borderColor="teal.300"
            color="teal.300"
            variant="outline"
            fontSize="md"
            p="8px 32px"
            onClick={onOpen}
          >
            Добавить товар
          </Button>
        </Box>
      )}

      <Flex pt={16}>
        <SimpleGrid columns={{ sm: 1, lg: 3, xl: 4 }} spacing="24px">
          {products &&
            products.rows.map((product) => (
              <ProductAddToCart key={product.id} {...product} />
            ))}
        </SimpleGrid>
      </Flex>
      <Modal onClose={onClose} size={"lg"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalAddProductContent />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default Billing;
