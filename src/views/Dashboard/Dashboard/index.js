// Chakra imports
import {
  Flex,
  SimpleGrid,
  Stack,
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
// assets

import React, { useState } from "react";
import { useDebounce } from "hooks/use-debounce";
import Project from "./components/Project";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useGetItems } from "../../../hooks/use-get-items";
export default function Dashboard() {
  const [isApproved, setIsApproved] = useState("3");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);
  const [result, setResult] = useState("3");
  const debouncedSearch = useDebounce(search, 500);
  const [modalImage, setModalImage] = useState("");
  const [modalUserName, setModalUserName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const { items, isLoading } = useGetItems(
    isApproved,
    debouncedSearch,
    result,
    sort,
    fetchTrigger
  );
  console.log(items);
  return (
    <>
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
              <PopoverContent _focus={{ boxShadown: "none" }} w={"unset"}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader fontWeight="bold">
                  Выберите параметры:
                </PopoverHeader>
                <PopoverBody w="full">
                  <Text fontWeight={600} size="sm" mb={4}>
                    Подтверждено
                  </Text>
                  <RadioGroup
                    defaultValue={false}
                    onChange={setIsApproved}
                    value={isApproved}
                  >
                    <Stack spacing={5} direction="row">
                      <Radio colorScheme="green" value="1">
                        Да
                      </Radio>
                      <Radio colorScheme="red" value="2">
                        Нет
                      </Radio>
                      <Radio colorScheme="blue" value="3">
                        Ожидает
                      </Radio>
                      <Radio colorScheme="blue" value="4">
                        Показать все
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <Text fontWeight={600} size="sm" mb={4} mt={4}>
                    Результат
                  </Text>
                  <RadioGroup
                    defaultValue={false}
                    onChange={setResult}
                    value={result}
                  >
                    <Stack spacing={5} direction="row">
                      <Radio colorScheme="blue" value="0">
                        Победитель
                      </Radio>
                      <Radio colorScheme="blue" value="1">
                        Призер
                      </Radio>
                      <Radio colorScheme="blue" value="2">
                        Участник
                      </Radio>
                      <Radio colorScheme="blue" value="3">
                        Показать все
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Box>
              <Input
                variant="outline"
                placeholder="Поиск"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
          </Stack>
          <Stack spacing={5} direction="row">
            <Checkbox
              colorScheme="blue"
              onChange={(e) => setSort(e.target.checked)}
              checked={sort}
            >
              Сортировать по убыванию
            </Checkbox>
          </Stack>
        </Flex>

        <SimpleGrid columns={{ sm: 1, lg: 2, xl: 4 }} spacing="24px">
          {items &&
            items.rows.map((item) => (
              <Project
                key={item.id}
                {...item}
                onOpen={onOpen}
                setModalImage={setModalImage}
                setModalUserName={setModalUserName}
                setFetchTrigger={setFetchTrigger}
                fetchTrigger={fetchTrigger}
              />
            ))}
        </SimpleGrid>
      </Stack>
      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalUserName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <img src={modalImage} alt="modal-image" />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Закрыть</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
