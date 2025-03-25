import Button from "@/components/Button";
import { render, screen, fireEvent } from "@testing-library/react";
import { FaBeer } from "react-icons/fa";

describe("Button Component", () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o botão com o texto fornecido", () => {
    render(<Button text="Clique aqui" onClick={handleClick} />);

    const button = screen.getByTestId("button-Clique-aqui");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Clique aqui");
  });

  it("deve renderizar o botão com o ícone fornecido", () => {
    render(<Button text="Curtir" icon={FaBeer} onClick={handleClick} />);

    const button = screen.getByTestId("button-Curtir");
    const icon = screen.getByTestId("button-icon-Curtir");
    expect(button).toContainElement(icon);
  });

  it("deve chamar a função onClick ao clicar no botão", () => {
    render(<Button text="Enviar" onClick={handleClick} />);

    const button = screen.getByTestId("button-Enviar");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("deve aplicar a classe secundária quando a prop secondary for true", () => {
    render(<Button text="Cancelar" secondary onClick={handleClick} />);

    const button = screen.getByTestId("button-Cancelar");
    expect(button).toHaveStyle("background-color: rgb(20, 184, 23)");
  });

  it("deve aplicar a classe primária quando a prop secondary for false", () => {
    render(<Button text="Salvar" secondary={false} onClick={handleClick} />);

    const button = screen.getByTestId("button-Salvar");
    expect(button).toHaveStyle("background-color: rgb(14, 116, 180)");
  });
});
