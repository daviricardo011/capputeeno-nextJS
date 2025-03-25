import DropdownMenu, { IDropdownOption } from "@/components/DropdownMenu";
import { render, screen, fireEvent } from "@testing-library/react";

describe("DropdownMenu", () => {
  const mockOptions: IDropdownOption[] = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  const setup = (title: string) => {
    render(
      <DropdownMenu
        options={mockOptions}
        title={title}
        position="left"
        type="category"
      />
    );
  };

  it("deve renderizar o título corretamente", () => {
    const title = "Filtrar por";
    setup(title);

    expect(screen.getByTestId(`dropdown-button-${title}`)).toHaveTextContent(
      title
    );
  });

  it("deve exibir as opções ao clicar no botão", () => {
    const title = "Filtrar por";
    setup(title);

    const button = screen.getByTestId(`dropdown-button-${title}`);
    fireEvent.click(button);

    expect(screen.getByTestId(`dropdown-options-${title}`)).toBeVisible();
  });

  it("deve ocultar as opções ao clicar novamente no botão", () => {
    const title = "Filtrar por";
    setup(title);

    const button = screen.getByTestId(`dropdown-button-${title}`);
    fireEvent.click(button);

    expect(screen.getByTestId(`dropdown-options-${title}`)).toBeVisible();

    fireEvent.click(button);

    expect(screen.queryByTestId(`dropdown-options-${title}`)).not.toBeVisible();
  });

  it("deve renderizar corretamente as opções", () => {
    const title = "Filtrar por";
    setup(title);

    fireEvent.click(screen.getByTestId(`dropdown-button-${title}`));

    mockOptions.forEach((option) => {
      expect(
        screen.getByTestId(`dropdown-option-${title}-${option.value}`)
      ).toHaveTextContent(option.label);
    });
  });

  it("deve redirecionar para o link correto ao clicar em uma opção", () => {
  const title = "Filtrar por";
  setup(title);

  const option = mockOptions[0];
  fireEvent.click(screen.getByTestId(`dropdown-button-${title}`));
  const optionLink = screen.getByTestId(
    `dropdown-option-${title}-${option.value}`
  );

  const locationAssignSpy = jest.fn();

  Object.defineProperty(window, 'location', {
    value: {
      href: '',
      origin: 'http://localhost',
      assign: locationAssignSpy,
    },
    writable: true,
  });
  fireEvent.click(optionLink);

  setTimeout(() => {
    expect(locationAssignSpy).toHaveBeenCalledWith(
      "http://localhost/?category=1"
    );
  }, 0);
});
});
