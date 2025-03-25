import { useCart } from "@/contexts/CartContext";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { TestCartProvider } from "../test-utils";
import Header from "@/components/Header";
import userEvent from "@testing-library/user-event";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockPush,
    forward: mockPush,
    refresh: mockPush,
    replace: mockPush,
    prefetch: mockPush,
  }),
}));
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );

  MockLink.displayName = "NextLink";

  return MockLink;
});

const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

function CartTestComponent() {
  const { cart, setCart } = useCart();

  return (
    <div>
      <span data-testid="cart-length">{cart.length}</span>
      <button
        data-testid="add-to-cart"
        onClick={() => setCart([...cart, cart.length + 1])}
      >
        Add Item
      </button>
    </div>
  );
}

describe("Header", () => {
  afterEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  it("deve ter link correto para a página inicial", () => {
    render(
      <TestCartProvider>
        <Header />
      </TestCartProvider>
    );

    const logoLink = screen.getByTestId("logo");
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("deve ter link correto para o carrinho", () => {
    render(
      <TestCartProvider>
        <Header />
      </TestCartProvider>
    );

    const cartButton = screen.getByTestId("cart-button");
    expect(cartButton).toHaveAttribute("href", "/shoppingCart");
  });

  it("deve fazer a pesquisa corretamente", async () => {
    render(
      <TestCartProvider>
        <Header />
      </TestCartProvider>
    );

    const searchInput = screen.getByPlaceholderText(
      "Procurando por algo específico?"
    );
    const searchForm = screen.getByTestId("search-form");

    await userEvent.type(searchInput, "Produto X");
    fireEvent.submit(searchForm);

    expect(mockPush).toHaveBeenCalledWith("/?search=Produto%20X");
  });

  it("deve inicializar o carrinho com dados do localStorage", () => {
    localStorage.setItem("cart", JSON.stringify([1, 2, 3]));

    render(
      <TestCartProvider>
        <CartTestComponent />
      </TestCartProvider>
    );

    expect(screen.getByTestId("cart-length")).toHaveTextContent("3");
  });

  it("deve atualizar o carrinho no localStorage quando adicionar um item", () => {
    render(
      <TestCartProvider>
        <CartTestComponent />
      </TestCartProvider>
    );

    const addButton = screen.getByTestId("add-to-cart");

    act(() => {
      addButton.click();
    });

    expect(screen.getByTestId("cart-length")).toHaveTextContent("1");
    expect(localStorage.getItem("cart")).toBe(JSON.stringify([1]));
  });

  it("deve salvar o carrinho no localStorage após mudança", () => {
    render(
      <TestCartProvider>
        <CartTestComponent />
      </TestCartProvider>
    );

    const addButton = screen.getByTestId("add-to-cart");

    act(() => {
      addButton.click();
    });

    expect(localStorage.getItem("cart")).toBe(JSON.stringify([1]));
  });
});
