import { render, screen, fireEvent } from "@testing-library/react";
import AddShoppingCartButton from "@/app/product/[id]/components/AddShoppingCartButton";
import { useCart } from "@/contexts/CartContext";

// Mock do hook useCart
jest.mock("@/contexts/CartContext", () => ({
  useCart: jest.fn(),
}));

describe("AddShoppingCartButton", () => {
  const mockSetCart = jest.fn();

  beforeEach(() => {
    mockSetCart.mockClear();
    (useCart as jest.Mock).mockReturnValue({ setCart: mockSetCart });
    localStorage.clear();
  });

  it("deve renderizar o botão corretamente", () => {
    render(<AddShoppingCartButton productId={1} />);

    const button = screen.getByText("Adicionar ao carrinho");
    expect(button).toBeInTheDocument();
  });

  it("deve adicionar o produto no carrinho ao clicar no botão", () => {
    render(<AddShoppingCartButton productId={1} />);

    const button = screen.getByText("Adicionar ao carrinho");

    fireEvent.click(button);

    const cartStr = localStorage.getItem("cart");
    const cart = JSON.parse(cartStr || "[]");
    expect(cart).toContain(1);

    expect(mockSetCart).toHaveBeenCalledWith(cart);
  });

  it("deve lidar corretamente com o erro ao tentar adicionar produto no carrinho", () => {
    const originalLocalStorage = Object.getOwnPropertyDescriptor(
      window,
      "localStorage"
    );
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: () => null,
        setItem: () => {
          throw new Error("Erro ao acessar o localStorage");
        },
      },
    });

    render(<AddShoppingCartButton productId={1} />);

    const button = screen.getByText("Adicionar ao carrinho");

    fireEvent.click(button);
    expect(mockSetCart).not.toHaveBeenCalled();

    if (originalLocalStorage) {
      Object.defineProperty(window, "localStorage", originalLocalStorage);
    }
  });
});
