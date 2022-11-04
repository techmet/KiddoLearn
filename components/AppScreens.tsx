import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Home } from "./Home";
import { Numbers } from "./Numbers/Index";
import { MatchNumbers } from "./Numbers/MatchNumber";
export const linking = {
  prefixes: [],
  config: {
    screens: {
      Home: {
        path: "/",
      },
      Numbers: {
        path: "numbers",
        screens: {
          NumbersHome: "/",
          MatchNumber: "/matchnumber",
        },
      },
    },
  },
};
const Stack = createNativeStackNavigator();
const NumbersStack = createNativeStackNavigator();

const NumbersScreens = () => (
  <NumbersStack.Navigator>
    <NumbersStack.Screen
      name="NumbersHome"
      component={Numbers}
      options={{
        title: "Choose Number Exercise",
        headerShown: false,
      }}
    />
    <NumbersStack.Screen
      name="MatchNumber"
      component={MatchNumbers}
      options={{
        title: "Choose Number Range",
        headerShown: false,
      }}
    />
  </NumbersStack.Navigator>
);
export const AppScreens = () => {
  return (
    <NavigationContainer
      linking={linking}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
        },
      }}
    >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Numbers"
          component={NumbersScreens}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
