import DropdownQuantity from "@/components/DropdownQuantity";
import { render, screen, fireEvent } from "@testing-library/react";

describe("DropdownQuantity", () => {
  let setSelectedValueMock: jest.Mock;

  beforeEach(() => {
    setSelectedValueMock = jest.fn();
  });

  it("deve renderizar o valor selecionado corretamente", () => {
    render(
      <DropdownQuantity
        selectedValue={5}
        setSelectedValue={setSelectedValueMock}
      />
    );

    expect(screen.getByTestId("dropdown-button")).toHaveTextContent("5");
  });

  it("deve abrir e fechar o dropdown ao clicar no botão", () => {
    render(
      <DropdownQuantity
        selectedValue={5}
        setSelectedValue={setSelectedValueMock}
      />
    );

    const dropdownButton = screen.getByTestId("dropdown-button");
    const dropdownOptions = screen.getByTestId("dropdown-options");

    expect(dropdownOptions).not.toBeVisible();

    fireEvent.click(dropdownButton);
    expect(dropdownOptions).toBeVisible();

    fireEvent.click(dropdownButton);
    expect(dropdownOptions).not.toBeVisible();
  });

  it("deve chamar setSelectedValue com o valor correto ao clicar em uma opção", () => {
    render(
      <DropdownQuantity
        selectedValue={5}
        setSelectedValue={setSelectedValueMock}
      />
    );

    fireEvent.click(screen.getByTestId("dropdown-button"));

    const option = screen.getByTestId("dropdown-option-10");
    fireEvent.click(option);

    expect(setSelectedValueMock).toHaveBeenCalledWith(10);
  });
});
