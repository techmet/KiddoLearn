import { Select, CheckIcon } from "native-base";
import React, { useEffect, useState } from "react";

export const RangeSelection = ({
  onDefaultSelection,
  onValueChange,
  defaultIndex = 0,
}: {
  onDefaultSelection: (itemValue: string) => void;
  onValueChange: (itemValue: string) => void;
  defaultIndex?: number;
}) => {
  const numberRanges = [
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

  const defaultItem = numberRanges[defaultIndex];

  const [numberRange, setNumberRange] = useState<string>(defaultItem);

  useEffect(() => {
    onDefaultSelection(defaultItem);
  }, []);
  return (
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
        setNumberRange(itemValue);
        onValueChange(itemValue);
      }}
    >
      {numberRanges.map((tile) => (
        <Select.Item key={tile} label={tile} value={tile} />
      ))}
    </Select>
  );
};
