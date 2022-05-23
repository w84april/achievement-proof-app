// Chakra imports
import {
  Box,
  Flex,
  Grid,
  Icon,
  Text,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BackgroundCard1 from "assets/img/BackgroundCard1.png";
import { MastercardIcon, VisaIcon } from "components/Icons/Icons";
import React from "react";
import { FaPaypal, FaWallet } from "react-icons/fa";
import { RiMastercardFill } from "react-icons/ri";
import {
  billingData,
  invoicesData,
  newestTransactions,
  olderTransactions,
} from "variables/general";
import BillingInformation from "./components/BillingInformation";
import CreditCard from "./components/CreditCard";
import Invoices from "./components/Invoices";
import PaymentMethod from "./components/PaymentMethod";
import PaymentStatistics from "./components/PaymentStatistics";
import { ProductAddToCart } from "./components/Product";
import Transactions from "./components/Transactions";

function Billing() {
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Box bg={bgColor} my="22px" borderRadius="12px">
        <Text p="24px">
          Для работы с этой страницей необходимо расширение Metamask.
        </Text>
      </Box>
      <SimpleGrid columns={{ sm: 1, lg: 3, xl: 4 }} spacing="24px">
        <ProductAddToCart rating={5} numReviews={100} />
        <ProductAddToCart rating={5} numReviews={100} />
        <ProductAddToCart rating={5} numReviews={100} />
        <ProductAddToCart rating={5} numReviews={100} />
        <ProductAddToCart rating={5} numReviews={100} />
        <ProductAddToCart rating={5} numReviews={100} />
        <ProductAddToCart rating={5} numReviews={100} />
      </SimpleGrid>
    </Flex>
  );
}

export default Billing;
