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
    <ButtonContainer
      $secondary={!!secondary}
      onClick={onClick}
      data-testid={`button-${text.replaceAll(" ", "-")}`}
    >
      {Icon && (
        <span data-testid={`button-icon-${text.replaceAll(" ", "-")}`}>
          <Icon size={24} />
        </span>
      )}
      <span data-testid={`button-text-${text.replaceAll(" ", "-")}`}>
        {text}
      </span>
    </ButtonContainer>
  );
}
