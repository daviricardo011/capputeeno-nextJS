"use client";

import { useState } from "react";
import { Container, DropdownButton, Options, ScreenBackground } from "./styles";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IDropdownOption } from "../DropdownMenu";

interface Props {
  selectedValue: number;
  setSelectedValue: (a: number) => void;
}

function generateNumbers(): IDropdownOption[] {
  return Array.from({ length: 100 }, (_, i) => ({
    label: (i + 1).toString(),
    value: (i + 1).toString(),
  }));
}

const options = generateNumbers();

export default function DropdownQuantity({
  selectedValue,
  setSelectedValue,
}: Props) {
  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);

  const selectValue = (value: string) => {
    setDropdownOpened(false);
    setSelectedValue(Number(value));
  };

  return (
    <Container>
      <ScreenBackground
        $isOpened={dropdownOpened}
        className="screenBackground"
        onClick={() => setDropdownOpened(!dropdownOpened)}
      />
      <DropdownButton
        className="button"
        onClick={() => setDropdownOpened(!dropdownOpened)}
        $isOpened={dropdownOpened}
      >
        <span>{selectedValue}</span>
        {dropdownOpened ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </DropdownButton>
      <Options className="dropdown" $isOpened={dropdownOpened}>
        {options.map((option) => (
          <span key={option.value} onClick={() => selectValue(option.value)}>
            {option.label}
          </span>
        ))}
      </Options>
    </Container>
  );
}
