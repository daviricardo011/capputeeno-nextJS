import { render, screen } from "@testing-library/react";
import Pagination from "@/components/Pagination";
import { IProduct } from "@/mocks/products";

// Mock do next/link corrigido com displayName
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

const mockUseSearchParams = jest.fn();
jest.mock("next/navigation", () => ({
  useSearchParams: () => mockUseSearchParams(),
}));

describe("Pagination Component", () => {
  const mockProducts: IProduct[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    src: `/images/produto-${i + 1}.jpg`,
    name: `Produto ${i + 1}`,
    price: (i + 1) * 10,
    category: "Categoria A",
    createdAt: new Date().toISOString(),
    quantitySold: Math.floor(Math.random() * 100),
    description: `Descrição do Produto ${i + 1}`,
  }));

  beforeEach(() => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams({ page: "1" }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar corretamente os botões de paginação", () => {
    render(<Pagination products={mockProducts} itemsPerPage={5} />);

    expect(screen.getByTestId("pagination-menu")).toBeInTheDocument();

    const prevButton = screen.getByTestId("prev-page-button");
    expect(prevButton).toHaveAttribute("disabled");

    const nextButton = screen.getByTestId("next-page-button");
    expect(nextButton).not.toHaveAttribute("disabled");

    for (let i = 1; i <= 4; i++) {
      expect(screen.getByTestId(`page-button-${i}`)).toBeInTheDocument();
    }
  });

  it("deve desativar o botão de avançar na última página", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams({ page: "4" }));

    render(<Pagination products={mockProducts} itemsPerPage={5} />);

    const nextButton = screen.getByTestId("next-page-button");
    expect(nextButton).toHaveAttribute("disabled");

    const prevButton = screen.getByTestId("prev-page-button");
    expect(prevButton).not.toHaveAttribute("disabled");
  });

  it("deve ter o href correto nos botões de página", () => {
    render(<Pagination products={mockProducts} itemsPerPage={5} />);

    const secondPageButton = screen.getByTestId("page-button-2");
    expect(secondPageButton).toHaveAttribute(
      "href",
      expect.stringContaining("page=2")
    );
  });

  it("deve ter o href correto nos botões de navegação", () => {
    render(<Pagination products={mockProducts} itemsPerPage={5} />);

    const nextButton = screen.getByTestId("next-page-button");
    expect(nextButton).toHaveAttribute(
      "href",
      expect.stringContaining("page=2")
    );
  });
});
