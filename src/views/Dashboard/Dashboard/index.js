// Chakra imports
import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
  Stack,
  Select,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Radio,
  Text,
  RadioGroup,
  Input,
  Box,
  Checkbox,
} from "@chakra-ui/react";
// assets
import peopleImage from "assets/img/people-image.png";
import logoChakra from "assets/svg/logo-white.svg";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React from "react";
import { dashboardTableData, timelineData } from "variables/general";
import ActiveUsers from "./components/ActiveUsers";
import BuiltByDevelopers from "./components/BuiltByDevelopers";
import MiniStatistics from "./components/MiniStatistics";
import OrdersOverview from "./components/OrdersOverview";
import Projects from "./components/Projects";
import SalesOverview from "./components/SalesOverview";
import WorkWithTheRockets from "./components/WorkWithTheRockets";
import Project from "./components/Project";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRecoilState } from "recoil";
import { userState } from "../../../state/index";
export default function Dashboard() {
  const [user, setUser] = useRecoilState(userState);

  return (
    <Stack style={{ marginTop: "80px" }}>
      <Flex justifyContent="space-between" mt={4} gap="20px">
        <Stack direction="row" justifyContent="space-between">
          <Popover placement="bottom" isLazy>
            <PopoverTrigger>
              <Button
                colorScheme="teal"
                borderColor="teal.300"
                color="teal.300"
                variant="outline"
                fontSize="md"
                p="8px 32px"
                rightIcon={<ChevronDownIcon />}
              >
                Фильтрация
              </Button>
            </PopoverTrigger>
            <PopoverContent _focus={{ boxShadown: "none" }}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader fontWeight="bold">
                Выберите параметры:
              </PopoverHeader>
              <PopoverBody w="full">
                <Text fontWeight={600} size="sm" mb={4}>
                  Подтверждено
                </Text>
                <RadioGroup defaultValue="2">
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="red" value="1">
                      Да
                    </Radio>
                    <Radio colorScheme="green" value="2">
                      Нет
                    </Radio>
                    <Radio colorScheme="green" value="3">
                      Показать все
                    </Radio>
                  </Stack>
                </RadioGroup>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Box>
            <Input variant="outline" placeholder="Поиск" />
          </Box>
        </Stack>
        <Stack spacing={5} direction="row">
          <Checkbox colorScheme="blue">Сортировать по убыванию</Checkbox>
        </Stack>
      </Flex>

      <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing="24px">
        <Project />
        <Project />
        <Project />
        <Project />
      </SimpleGrid>
    </Stack>
  );
}
