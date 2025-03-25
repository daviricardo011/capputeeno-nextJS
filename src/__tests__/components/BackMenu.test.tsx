// __tests__/BackMenu.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import BackMenu from "@/components/BackMenu";
import { useRouter } from "next/navigation";

// Mock do useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("BackMenu", () => {
  const mockBack = jest.fn();

  beforeEach(() => {
    // Configura o mock do useRouter para retornar a função back
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });
  });

  it("deve renderizar o botão de voltar", () => {
    render(<BackMenu />);

    const button = screen.getByTestId("backButton");
    expect(button).toBeInTheDocument();
  });

  it("deve chamar router.back() ao clicar no botão", () => {
    render(<BackMenu />);

    const button = screen.getByTestId("backButton");
    fireEvent.click(button);

    // Verifica se a função back foi chamada
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
