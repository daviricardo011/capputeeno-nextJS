import { render, screen } from "@testing-library/react";
import { IProduct } from "@/mocks/products";
import ProductDescription from "@/app/product/[id]/components/ProductDescription";
import "@testing-library/jest-dom";
import { moneyMask } from "@/utils/functions";
import { TestCartProvider } from "@/__tests__/test-utils";

const sampleProduct: IProduct = {
  id: 1,
  src: "image.jpg",
  name: "Caneca Personalizada",
  price: 50,
  category: "caneca",
  createdAt: "2021-01-01",
  description: "Uma caneca incrível para o seu dia.",
  quantitySold: 10,
};

describe("ProductDescription", () => {
  it("renderiza os detalhes do produto corretamente", () => {
    render(
      <TestCartProvider>
        <ProductDescription product={sampleProduct} />
      </TestCartProvider>
    );

    // Verifica se a categoria do produto é exibida corretamente
    const categoryElement = screen.getByTestId("product-category");
    expect(categoryElement).toHaveTextContent("Canecas");

    // Verifica se o nome do produto está sendo renderizado
    const titleElement = screen.getByTestId("product-title");
    expect(titleElement).toHaveTextContent(sampleProduct.name);

    // Verifica se o preço é renderizado com a formatação aplicada pelo moneyMask
    const priceElement = screen.getByTestId("product-price");
    expect(priceElement.textContent?.trim()).toBe(
      moneyMask(sampleProduct.price).trim()
    );

    // Verifica se o aviso de frete está na tela
    const warningElement = screen.getByTestId("product-warning");
    expect(warningElement).toHaveTextContent(
      "*Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$900,00."
    );

    // Verifica se o título e o texto da descrição estão sendo renderizados
    const descriptionTitleElement = screen.getByTestId("description-title");
    expect(descriptionTitleElement).toHaveTextContent("DESCRIÇÃO");

    const descriptionTextElement = screen.getByTestId("description-text");
    expect(descriptionTextElement).toHaveTextContent(sampleProduct.description);

    // Verifica se o botão de adicionar ao carrinho é renderizado
    const addButtonElement = screen.getByTestId("add-shopping-cart-button");
    expect(addButtonElement).toBeInTheDocument();
  });

  it("renderiza sem categoria quando não encontrada", () => {
    const productWithoutCategory: IProduct = {
      ...sampleProduct,
      category: "non-existent",
    };
    render(
      <TestCartProvider>
        <ProductDescription product={productWithoutCategory} />
      </TestCartProvider>
    );

    const categoryElement = screen.getByTestId("product-category");
    expect(categoryElement).toBeEmptyDOMElement();

    const titleElement = screen.getByTestId("product-title");
    expect(titleElement).toHaveTextContent(productWithoutCategory.name);

    const descriptionTextElement = screen.getByTestId("description-text");
    expect(descriptionTextElement).toHaveTextContent(
      productWithoutCategory.description
    );
  });
});
