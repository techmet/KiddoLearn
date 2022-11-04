import { Text, Pressable, Box, View } from "native-base";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export const Tiles = ({
  tiles,
  title,
}: {
  title?: string;
  tiles: {
    text: string;
    path: string;
  }[];
}) => {
  const navigation = useNavigation();
  return (
    <View mt="20">
      {title && (
        <Text fontSize="4xl" color="purple.400" textAlign="center">
          {title}
        </Text>
      )}
      <Box
        display="flex"
        alignItems="center"
        flexDirection="row"
        justifyContent="space-evenly"
        flexWrap="wrap"
        mt="10"
      >
        {tiles.map(({ text, path }) => (
          <Pressable
            key={text}
            onPress={() => {
              navigation.navigate(path as never);
            }}
          >
            <Box
              w="120"
              h="120"
              m="10"
              borderStyle="solid"
              borderWidth="3"
              borderRadius="10"
              alignItems="center"
              justifyContent="center"
              borderColor="purple.400"
            >
              <Text fontSize="2xl" color="violet.900">
                {text}
              </Text>
            </Box>
          </Pressable>
        ))}
      </Box>
    </View>
  );
};
