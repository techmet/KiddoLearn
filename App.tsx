import React from "react";
import {
  Text,
  HStack,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  Container,
  ScrollView,
} from "native-base";
import { Home } from "./components/Home";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AppScreens } from "./components/AppScreens";
// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

const nativeBaseconfig = {
  dependencies: {
    "linear-gradient": require("react-native-linear-gradient").default,
  },
};

export default function App() {
  return (
    <NativeBaseProvider config={nativeBaseconfig}>
      <AppScreens />
    </NativeBaseProvider>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
