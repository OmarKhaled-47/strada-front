"use client";

import type React from "react";
import { useState } from "react";

interface UseSliderWithInputProps {
  minValue: number;
  maxValue: number;
  initialValue: [number, number];
  defaultValue: [number, number];
}

export function useSliderWithInput({
  minValue,
  maxValue,
  initialValue,
  defaultValue,
}: UseSliderWithInputProps) {
  const [sliderValue, setSliderValue] =
    useState<[number, number]>(initialValue);
  const [inputValues, setInputValues] = useState<[string, string]>([
    initialValue[0].toLocaleString(),
    initialValue[1].toLocaleString(),
  ]);

  // Format number for display
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  // Parse string to number
  const parseNumber = (str: string): number => {
    return Number.parseInt(str.replace(/,/g, ""), 10);
  };

  // Handle slider change
  const handleSliderChange = (values: number[]) => {
    const newValues: [number, number] = [values[0], values[1]];
    setSliderValue(newValues);
    setInputValues([formatNumber(newValues[0]), formatNumber(newValues[1])]);
  };

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/[^\d,]/g, "");
    const newInputValues = [...inputValues] as [string, string];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  // Validate and update value
  const validateAndUpdateValue = (value: string, index: number) => {
    let parsedValue = parseNumber(value);

    if (isNaN(parsedValue)) {
      parsedValue = index === 0 ? minValue : maxValue;
    }

    // Ensure value is within bounds
    parsedValue = Math.max(minValue, Math.min(maxValue, parsedValue));

    // Ensure min <= max
    if (index === 0 && parsedValue > sliderValue[1]) {
      parsedValue = sliderValue[1];
    } else if (index === 1 && parsedValue < sliderValue[0]) {
      parsedValue = sliderValue[0];
    }

    const newSliderValue = [...sliderValue] as [number, number];
    newSliderValue[index] = parsedValue;
    setSliderValue(newSliderValue);

    const newInputValues = [...inputValues] as [string, string];
    newInputValues[index] = formatNumber(parsedValue);
    setInputValues(newInputValues);
  };

  // Reset to default values
  const resetToDefault = () => {
    setSliderValue(defaultValue);
    setInputValues([
      formatNumber(defaultValue[0]),
      formatNumber(defaultValue[1]),
    ]);
  };

  return {
    sliderValue,
    inputValues,
    handleSliderChange,
    handleInputChange,
    validateAndUpdateValue,
    resetToDefault,
  };
}
