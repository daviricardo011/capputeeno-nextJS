"use client";

import { useState } from "react";
import { Container, DropdownButton, Options, ScreenBackground } from "./styles";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSearchParams } from "next/navigation";
export interface IDropdownOption {
  label: string;
  value: string;
}

interface Props {
  options: IDropdownOption[];
  title: string;
  position: "right" | "left" | "up";
  type: "category" | "sortBy" | "help";
  url?: string;
}

export default function DropdownMenu({
  options,
  title,
  position,
  type,
  url,
}: Props) {
  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const updatePageParam = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!sortValue) {
      params.delete(type);
    } else {
      params.set(type, sortValue);
    }
    return `${url || ""}/?${params.toString()}`;
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
        <span>{title}</span>
        {dropdownOpened ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </DropdownButton>
      <Options
        className="dropdown"
        $isOpened={dropdownOpened}
        position={position}
      >
        {options.map((option) => (
          <a key={option.value} href={updatePageParam(option.value)}>
            {option.label}
          </a>
        ))}
      </Options>
    </Container>
  );
}
