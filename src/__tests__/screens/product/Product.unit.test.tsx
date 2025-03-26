/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, within } from "@testing-library/react";
import ProductPage from "@/app/product/[id]/page";
import BackMenu from "@/components/BackMenu";
import { notFound } from "next/navigation";
import ProductImage from "@/app/product/[id]/components/ProductImage";
import ProductDescription from "@/app/product/[id]/components/ProductDescription";
import { TestCartProvider } from "@/__tests__/test-utils";

const mockJest = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockJest,
  }),
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

const mockProduct = {
  id: 1,
  src: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lzszylrwm6o142",
  name: "T Shirt Feminina Camiseta",
  price: 24.99,
  category: "camiseta",
  createdAt: "2025-02-21T19:08:40.806Z",
  quantitySold: 1,
  description: "Aqui vem um texto descritivo do produto...",
};

describe("BackMenu Component", () => {
  beforeEach(() => {
    mockJest.mockClear();
  });

  it("deve navegar de volta ao clicar", () => {
    render(<BackMenu />);
    fireEvent.click(screen.getByTestId("backButton"));
    expect(mockJest).toHaveBeenCalledTimes(1);
  });
  it("deve exibir ícone e texto corretamente", () => {
    render(<BackMenu />);
    expect(screen.getByText("Voltar")).toBeInTheDocument();
    expect(screen.getByAltText("Voltar")).toBeInTheDocument();
  });
});

describe("ProductImage Component", () => {
  it("deve exibir a imagem correta", () => {
    render(<ProductImage product={mockProduct} />);
    expect(
      screen.getByTestId(`product-image-container-${mockProduct.id}`)
    ).toBeInTheDocument();
    const img = within(
      screen.getByTestId(`product-image-container-${mockProduct.id}`)
    ).getByRole("img");
    expect(img).toHaveAttribute("src", mockProduct.src);
    expect(img).toHaveAttribute("alt", `${mockProduct.name} Imagem`);
    expect(img).toHaveStyle({
      objectFit: "cover",
      borderRadius: "4px",
    });
  });
  it("deve lidar com produto sem imagem", () => {
    render(<ProductImage product={{ ...mockProduct, src: "" }} />);
    const img = within(
      screen.getByTestId(`product-image-container-${mockProduct.id}`)
    ).getByRole("img");
    expect(img).not.toHaveAttribute("src");
  });
});

describe("ProductDescription Component", () => {
  it("deve exibir todas as informações do produto", () => {
    render(
      <TestCartProvider>
        <ProductDescription product={mockProduct} />
      </TestCartProvider>
    );

    expect(screen.getByTestId("product-title")).toHaveTextContent(
      mockProduct.name
    );
    expect(screen.getByTestId("product-price")).toHaveTextContent("R$ 24,99");
    expect(screen.getByTestId("description-text")).toHaveTextContent(
      mockProduct.description
    );
  });
});

describe("ProductPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve exibir produto existente", async () => {
    const page = await ProductPage({ params: { id: String(mockProduct.id) } });
    render(<TestCartProvider>{page}</TestCartProvider>);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  });

  it("deve retornar 404 para produto inexistente", async () => {
    await ProductPage({ params: { id: "9999" } });
    expect(notFound).toHaveBeenCalled();
  });
});
