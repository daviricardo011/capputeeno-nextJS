import { render, screen, within } from "@testing-library/react";
import Home from "@/app/page";
import { categories } from "@/mocks/categories";
import { products } from "@/mocks/products";

// Mock do useRouter para navegação
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("Home Page - Testes de Integração", () => {
  it("deve renderizar todos os componentes principais com interação completa", async () => {
    const page = await Home({ searchParams: {} });
    render(page);

    const categoryMenu = screen.getByTestId("category-menu");
    expect(categoryMenu).toBeInTheDocument();

    categories.forEach((category) => {
      const elements = screen.getAllByText(category.name);
      expect(elements).toHaveLength(2);
    });

    const displayedProducts = products.slice(0, 12);
    displayedProducts.forEach((product) => {
      const selected = screen.getByTestId(`product-card-${product.id}`);
      expect(selected).toBeInTheDocument();
      expect(selected).toHaveTextContent(product.name);
    });

    const paginationMenus = screen.getAllByTestId("pagination-menu");
    expect(paginationMenus).toHaveLength(2);

    const button1 = screen.getAllByTestId("pagination-menu");
    expect(button1).toHaveLength(2);

    const nextPageButton = screen.getAllByTestId("pagination-menu");
    expect(nextPageButton).toHaveLength(2);

    paginationMenus.forEach((menu) => {
      expect(menu).toBeVisible();
    });
    button1.forEach((b) => {
      expect(b).toBeVisible();
    });
    nextPageButton.forEach((b) => {
      expect(b).toBeVisible();
    });
  });

  it("deve filtrar produtos por categoria ao clicar no menu", async () => {
    const page = await Home({
      searchParams: { category: categories[1].value },
    });
    render(page);

    const filteredProducts = products.filter(
      (p) => p.category === categories[1].value
    );

    filteredProducts.slice(0, 12).forEach((product) => {
      expect(
        screen.getByTestId(`product-card-${product.id}`)
      ).toBeInTheDocument();
    });
  });

  it("deve ordenar produtos ao selecionar opção no dropdown", async () => {
    const page = await Home({ searchParams: { sortBy: "highestPrice" } });
    render(page);

    const displayedPrices = screen
      .getAllByTestId(/product-price-/)
      .map((el) => {
        const priceElement = within(
          el.closest('[data-testid^="product-card-"]')!
        ).getByTestId(
          `product-price-${el.getAttribute("data-testid")?.split("-")[2]}`
        );

        const priceText = priceElement.textContent
          ?.replace(/[^0-9,]/g, "")
          .replace(",", ".");

        return parseFloat(priceText || "0");
      });

    displayedPrices.forEach((price) => {
      expect(price).not.toBeNaN();
      expect(price).toBeGreaterThan(0);
    });

    for (let i = 0; i < displayedPrices.length - 1; i++) {
      expect(displayedPrices[i]).toBeGreaterThanOrEqual(displayedPrices[i + 1]);
    }
  });

  it("deve mudar de página corretamente", async () => {
    const page = await Home({ searchParams: { page: "2" } });
    render(page);

    const page2Products = products.slice(12, 24);
    page2Products.forEach((product) => {
      expect(
        screen.getByTestId(`product-card-${product.id}`)
      ).toBeInTheDocument();
    });
  });

  it("deve mostrar mensagem quando não houver resultados", async () => {
    const page = await Home({ searchParams: { search: "termo-inexistente" } });
    render(page);

    expect(screen.queryAllByTestId(/product-card-/)).toHaveLength(0);
  });
});
