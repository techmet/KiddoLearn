import { Tiles } from "../Utils/Tiles";
export const Numbers = () => {
  const tiles = [
    { text: "Match Number", path: "MatchNumber" },
    { text: "><=", path: "Comparisions" },
  ];
  return <Tiles title="Choose Number Exercise" tiles={tiles} />;
};
