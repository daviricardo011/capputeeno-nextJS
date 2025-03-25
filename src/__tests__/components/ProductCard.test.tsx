/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/mocks/products";
import { moneyMask } from "@/utils/functions";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
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

jest.mock("@/utils/functions", () => ({
  moneyMask: jest.fn().mockImplementation((value: number) => {
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  }),
}));

const mockProduct: IProduct = {
  id: 1,
  src: "/image.jpg",
  name: "Produto Teste",
  price: 199.9,
  category: "camisa",
  createdAt: new Date().toISOString(),
  quantitySold: 50,
  description: "Descrição do produto teste",
};

describe("ProductCard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar corretamente as informações do produto", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByTestId(`product-card-${mockProduct.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`product-image-${mockProduct.id}`)
    ).toHaveAttribute("src", mockProduct.src);
    expect(
      screen.getByTestId(`product-name-${mockProduct.id}`)
    ).toHaveTextContent(mockProduct.name);

    expect(moneyMask).toHaveBeenCalledWith(mockProduct.price);
    expect(
      screen.getByTestId(`product-price-${mockProduct.id}`)
    ).toHaveTextContent("R$ 199,90");
  });

  it("deve conter o link correto para a página do produto", () => {
    render(<ProductCard product={mockProduct} />);

    const link = screen.getByTestId(`product-card-${mockProduct.id}`);
    expect(link).toHaveAttribute("href", `/product/${mockProduct.id}`);
  });

  it("deve exibir a imagem corretamente", () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByTestId(`product-image-${mockProduct.id}`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "Produto");
    expect(image).toHaveAttribute("src", mockProduct.src);
  });

  it("deve formatar o preço usando a moneyMask", () => {
    render(<ProductCard product={mockProduct} />);

    expect(moneyMask).toHaveBeenCalledTimes(1);
    expect(moneyMask).toHaveBeenCalledWith(mockProduct.price);
    expect(
      screen.getByTestId(`product-price-${mockProduct.id}`)
    ).toHaveTextContent("R$ 199,90");
  });

  it("deve exibir valores diferentes corretamente", () => {
    const differentProduct: IProduct = {
      ...mockProduct,
      id: 2,
      name: "Outro Produto",
      price: 299.99,
    };

    render(<ProductCard product={differentProduct} />);

    expect(screen.getByTestId(`product-name-2`)).toHaveTextContent(
      "Outro Produto"
    );
    expect(screen.getByTestId(`product-price-2`)).toHaveTextContent(
      "R$ 299,99"
    );
    expect(screen.getByTestId(`product-card-2`)).toHaveAttribute(
      "href",
      "/product/2"
    );
  });
});
