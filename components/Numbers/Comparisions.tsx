import {
  Center,
  Box,
  Button,
  Pressable,
  Text,
  VStack,
  HStack,
} from "native-base";
import * as NumToWord from "number-to-words";
import React, { useState } from "react";
import * as Speech from "expo-speech";
import { generateNRandomNumbers } from "../../lib/misc";
import { RangeSelection } from "../Utils/RangeSelection";

export const Comparisions = () => {
  const NumberOfQuestions = 25;
  const [numberRange, setNumberRange] = useState<string>();
  const [remainingQuestions, setRemaining] = useState(NumberOfQuestions);
  const [numbersArr, setNumbersArr] = useState<number[]>([]);
  const [currentComparision, setCurrentComparision] = useState<string>();

  const Comparisions = [">", "<"];

  const textToSpeech = (arr: number[])=>{
    Speech.speak(`${NumToWord.toWords(arr[0])} is dash than ${NumToWord.toWords(arr[1])}`);
  }
  const getRandomNumber = (numberRange: string) => {
    const [min, max] = numberRange.split("-");
    const arr = generateNRandomNumbers(Number(min), Number(max), 2);
    setNumbersArr(arr);
    setCurrentComparision(arr[0] > arr[1] ? Comparisions[0] : Comparisions[1]);
    textToSpeech(arr);
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
        {currentComparision && (
          <VStack mt="21">
            <HStack
              minW="300"
              justifyContent="flex-end"
              alignItems="flex-end"
              mt="21"
            >
              <Text mb="2" fontSize="xl" color="violet.900">
                <Text color="green.700">
                  {NumberOfQuestions - remainingQuestions}{" "}
                </Text>
                / {NumberOfQuestions}
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
                    textToSpeech(numbersArr);
                  } else {
                    setRemaining(NumberOfQuestions);
                  }
                }}
              >
                🔄{remainingQuestions === 0 && "Reset"}
              </Button>
            </HStack>
            <Text mt="4" fontSize="6xl" textAlign="center" color="violet.900">
              {numbersArr[0]}{" ___ "}
              {numbersArr[1]}
            </Text>
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
          {Comparisions.map((comparision) => (
            <Pressable
              key={comparision}
              onPress={() => {
                if (comparision === currentComparision) {
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
                <Text fontSize="5xl" fontWeight="700" color="violet.900">
                  {comparision}
                </Text>
              </Box>
            </Pressable>
          ))}
        </VStack>
      )}
    </>
  );
};
