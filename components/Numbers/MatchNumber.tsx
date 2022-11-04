import {
  Select,
  Center,
  Box,
  CheckIcon,
  Button,
  Pressable,
  Text,
  VStack,
  HStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import * as Speech from "expo-speech";
import * as NumToWord from "number-to-words";

export const MatchNumbers = () => {
  const tiles = [
    "1-100",
    "101-200",
    "201-300",
    "301-400",
    "401-500",
    "501-600",
    "601-700",
    "701-800",
    "801-900",
    "901-1000",
  ];
  const NumberOfQuestions = 25;
  const [numberRange, setNumberRange] = useState("1-100");
  const [remainingQuestions, setRemaining] = useState(NumberOfQuestions);
  const [numbersArr, setNumbersArr] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | undefined>();

  const getRandomNumber = (numberRange: string) => {
    const [min, max] = numberRange.split("-");
    const { arr, number } = generate4RandomNumbers(Number(min), Number(max));
    setCurrentNumber(number);
    setNumbersArr(arr);
    Speech.speak(NumToWord.toWords(number.toString()));
  };

  useEffect(() => {
    if (numberRange) {
      getRandomNumber(numberRange);
    }
  }, []);

  return (
    <>
      <Center mt="20">
        <Select
          borderColor="purple.400"
          borderWidth="2"
          selectedValue={numberRange}
          minW="300"
          accessibilityLabel="Choose Number Range"
          placeholder="Choose Number Range"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          onValueChange={(itemValue) => {
            setRemaining(NumberOfQuestions);
            setNumberRange(itemValue);
            getRandomNumber(itemValue);
          }}
        >
          {tiles.map((tile) => (
            <Select.Item key={tile} label={tile} value={tile} />
          ))}
        </Select>
        {currentNumber && (
          <VStack mt="21">
            <Text textAlign="right" fontSize="xl" color="violet.900">
              <Text color="green.700">
                {NumberOfQuestions - remainingQuestions}{" "}
              </Text>
              / {NumberOfQuestions}
            </Text>
            <HStack minW="300" justifyContent="space-evenly" mt="21">
              <Text fontSize="xl" color="violet.900">
                {capitalizeFirstLetter(NumToWord.toWords(currentNumber))}
              </Text>
              <Button
                ml="2"
                backgroundColor="purple.400"
                borderRadius="2xl"
                _text={{
                  color: "violet.900",
                }}
                width="16"
                onPress={() => {
                  if (remainingQuestions !== 0) {
                    Speech.speak(currentNumber?.toString() || "");
                  } else {
                    setRemaining(NumberOfQuestions);
                  }
                }}
              >
                🔄{remainingQuestions === 0 && "Reset"}
              </Button>
            </HStack>
          </VStack>
        )}
      </Center>
      <VStack
        flexDirection="row"
        justifyContent="space-evenly"
        flexWrap="wrap"
        mt="21"
      >
        {numbersArr.map((number) => (
          <Pressable
            key={number}
            onPress={() => {
              if (number === currentNumber) {
                if (remainingQuestions === 1) {
                  Speech.speak(
                    "Welldone Srimayi, you have completed exercise!"
                  );
                  setRemaining(0);
                } else {
                  Speech.speak("Excellent");
                  setTimeout(() => {
                    getRandomNumber(numberRange);
                  }, 100);
                  setRemaining(remainingQuestions - 1);
                }
              } else {
                Speech.speak("Hmm, Try Again");
              }
            }}
          >
            <Box
              w="20"
              h="20"
              m="10"
              borderStyle="solid"
              borderWidth="3"
              borderRadius="10"
              alignItems="center"
              justifyContent="center"
              borderColor="purple.400"
            >
              <Text fontSize="2xl" color="violet.900">
                {number}
              </Text>
            </Box>
          </Pressable>
        ))}
      </VStack>
    </>
  );
};

const generate4RandomNumbers = (min: number, max: number) => {
  const arr = [];
  while (arr.length < 4) {
    const random = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(random) === -1) {
      arr.push(random);
    }
  }
  const index = Math.floor(Math.random() * arr.length);
  return { arr, number: arr[index] };
};

const capitalizeFirstLetter = (word: string) => {
  if (word) {
    word = word.replace("-", " ");
  }
  return word[0].toUpperCase() + word.slice(1);
};
