import {
  Center,
  Box,
  Button,
  Pressable,
  Text,
  VStack,
  HStack,
} from "native-base";
import React, { useState } from "react";
import * as Speech from "expo-speech";
import * as NumToWord from "number-to-words";
import { capitalizeFirstLetter, pickNumberFromNRandomNumbers } from "../../lib/misc";
import { RangeSelection } from "../Utils/RangeSelection";

export const MatchNumbers = () => {
  const NumberOfQuestions = 25;
  const [numberRange, setNumberRange] = useState<string>();
  const [remainingQuestions, setRemaining] = useState(NumberOfQuestions);
  const [numbersArr, setNumbersArr] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | undefined>();

  const getRandomNumber = (numberRange: string) => {
    const [min, max] = numberRange.split("-");
    const { arr, number } = pickNumberFromNRandomNumbers(Number(min), Number(max), 4);
    setCurrentNumber(number);
    setNumbersArr(arr);
    Speech.speak(NumToWord.toWords(number));
  };

  return (
    <>
      <Center mt="20">
        <RangeSelection
          onValueChange={(itemValue) => {
            setRemaining(NumberOfQuestions);
            setNumberRange(itemValue);
            getRandomNumber(itemValue);
          }}
          onDefaultSelection={(itemValue) => {
            setNumberRange(itemValue);
            getRandomNumber(itemValue);
          }}
        />
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
                  fontSize: "xl",
                }}
                width="16"
                onPress={() => {
                  if (remainingQuestions !== 0) {
                    Speech.speak(NumToWord.toWords(currentNumber));
                  } else {
                    setRemaining(NumberOfQuestions);
                  }
                }}
              >
                ????{remainingQuestions === 0 && "Reset"}
              </Button>
            </HStack>
          </VStack>
        )}
      </Center>
      {remainingQuestions > 0 && (
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
                      getRandomNumber(numberRange!);
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
      )}
    </>
  );
};
