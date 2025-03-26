/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductPage from "@/app/product/[id]/page";
import { TestCartProvider } from "@/__tests__/test-utils";
import { notFound } from "next/navigation";
import Header from "@/components/Header";

const mockBack = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: mockBack }),
  notFound: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { objectFit, objectPosition, ...restProps } = props;

    const style = {
      ...props.style,
      objectFit: objectFit || "cover",
      objectPosition: objectPosition || "center",
    };

    return (
      <img
        {...restProps}
        style={style}
        data-testid={`product-image-${props["data-testid"] || ""}`}
      />
    );
  },
}));

const prods = [
  {
    id: 1,
    src: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lzszylrwm6o142",
    name: "T Shirt Feminina Camiseta",
    price: 24.99,
    category: "camiseta",
    createdAt: "2025-02-21T19:08:40.806Z",
    quantitySold: 1,
    description:
      "Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.",
  },
  {
    id: 2,
    src: "https://down-br.img.susercontent.com/file/883a0156e011ad808f210267b1dad4e1",
    name: "Camiseta T-shirt Spy X Family",
    price: 49.99,
    category: "caneca",
    createdAt: "2025-03-10T19:08:40.806Z",
    quantitySold: 3,
    description:
      "Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.",
  },
];
const mockProduct = prods[0];

describe("Página de Produto - Integração", () => {
  beforeEach(() => {
    mockBack.mockClear();
    jest.clearAllMocks();
  });

  it("deve renderizar todos os componentes corretamente", async () => {
    const page = await ProductPage({ params: { id: String(mockProduct.id) } });

    render(<TestCartProvider>{page}</TestCartProvider>);

    expect(screen.getByTestId("backButton")).toBeInTheDocument();
    expect(
      screen.getByTestId(`product-image-container-${mockProduct.id}`)
    ).toBeInTheDocument();
    expect(screen.getByTestId("product-title")).toBeInTheDocument();
    expect(
      screen.getByTestId("button-Adicionar-ao-carrinho")
    ).toBeInTheDocument();
  });

  it("deve exibir informações corretas do produto", async () => {
    const page = await ProductPage({ params: { id: String(mockProduct.id) } });

    render(<TestCartProvider>{page}</TestCartProvider>);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText("R$ 24,99")).toBeInTheDocument();
  });

  it("deve adicionar produto ao carrinho", async () => {
    const page = await ProductPage({ params: { id: String(mockProduct.id) } });
    render(
      <TestCartProvider>
        <Header />
        {page}
      </TestCartProvider>
    );
    const button = screen.getByTestId("button-Adicionar-ao-carrinho");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
      expect(JSON.parse(localStorage.getItem("cart") || "[]")).toEqual([
        mockProduct.id,
      ]);
    });

    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByTestId("cart-count")).toHaveTextContent("2");
      expect(JSON.parse(localStorage.getItem("cart") || "[]")).toEqual([
        mockProduct.id,
        mockProduct.id,
      ]);
    });
  });

  it("deve retornar 404 para produto inexistente", async () => {
    await ProductPage({ params: { id: "9999" } });
    expect(notFound).toHaveBeenCalled();
  });

  it("deve navegar de volta ao clicar no botão", async () => {
    const page = await ProductPage({ params: { id: String(mockProduct.id) } });

    render(<TestCartProvider>{page}</TestCartProvider>);

    fireEvent.click(screen.getByTestId("backButton"));
    expect(mockBack).toHaveBeenCalled();
  });

  it("deve manter o estado do carrinho entre navegações", async () => {
    localStorage.clear();
    const page1 = await ProductPage({ params: { id: String(mockProduct.id) } });
    const { rerender } = render(
      <TestCartProvider>
        <Header />
        {page1}
      </TestCartProvider>
    );

    fireEvent.click(screen.getByTestId("button-Adicionar-ao-carrinho"));
    const cartAfterAdd = JSON.parse(localStorage.getItem("cart") || "[]");
    expect(cartAfterAdd).toContain(mockProduct.id);

    const page2 = await ProductPage({ params: { id: String(prods[1].id) } });
    rerender(
      <TestCartProvider>
        <Header />
        {page2}
      </TestCartProvider>
    );

    expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
    const cartAfterNavigation = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    expect(cartAfterNavigation).toContain(mockProduct.id);
    expect(cartAfterNavigation).toHaveLength(1);
  });
});
