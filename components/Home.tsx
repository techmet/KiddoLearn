import React from "react";
import { Tiles } from "./Utils/Tiles";

export const Home = () => {
  const homeTiles = [
    { text: "Numbers", path: "Numbers" },
    { text: "English", path: "English" },
    { text: "తెలుగు", path: "Telugu" },
    { text: "GK", path: "GK" },
  ];
  return <Tiles title="Choose Topic" tiles={homeTiles} />;
};
