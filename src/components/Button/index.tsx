"use client";

import { IconType } from "react-icons";
import { ButtonContainer } from "./styles";

interface Props {
  text: string;
  icon?: IconType;
  secondary?: boolean;
  onClick: () => void;
}
export default function Button({
  text,
  icon: Icon,
  secondary,
  onClick,
}: Props) {
  return (
    <ButtonContainer $secondary={!!secondary} onClick={onClick}>
      {Icon && <Icon size={24} />}
      <span>{text}</span>
    </ButtonContainer>
  );
}
