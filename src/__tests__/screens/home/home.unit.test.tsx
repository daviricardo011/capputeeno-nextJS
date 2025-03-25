/* eslint-disable @typescript-eslint/no-explicit-any */
import { itemsPerPage } from "@/app/page";
import { IProduct, products } from "@/mocks/products";
import {
  filterByCategory,
  filterByPage,
  searchProduct,
  sortProducts,
} from "@/utils/productFilters";

describe("Home Page - Testes Unitários", () => {
  const createMockProducts = (count: number): IProduct[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      src: `/product-${i + 1}.jpg`,
      name: `Produto ${i + 1}`,
      price: (i + 1) * 10,
      category: i % 2 === 0 ? "camiseta" : "caneca",
      createdAt: new Date(Date.now() - i * 86400000).toISOString(), // Dias decrescentes
      quantitySold: i + 1,
      description: `Descrição do Produto ${i + 1}`,
    }));
  };

  describe("filterByCategory", () => {
    const mockProducts: IProduct[] = createMockProducts(4);

    it("deve retornar apenas produtos da categoria especificada", () => {
      const result = filterByCategory(mockProducts, "camiseta");

      expect(result).toHaveLength(2);
      expect(result.every((p) => p.category === "camiseta")).toBe(true);
      expect(result.map((p) => p.id)).toEqual([1, 3]);
    });

    it("deve retornar array vazio para categoria inexistente", () => {
      const result = filterByCategory(mockProducts, "inexistente");
      expect(result).toHaveLength(0);
    });

    it("deve lidar corretamente com array vazio de produtos", () => {
      const result = filterByCategory([], "camiseta");
      expect(result).toHaveLength(0);
    });

    it('deve retornar todos os produtos quando categoria for "Todos os produtos" ou ""', () => {
      const allResults = filterByCategory(mockProducts, "Todos os produtos");
      expect(allResults).toHaveLength(mockProducts.length);

      const result = filterByCategory(mockProducts, "");
      expect(result).toHaveLength(mockProducts.length);
    });

    it("deve manter todas as propriedades dos produtos filtrados", () => {
      const result = filterByCategory(mockProducts, "camiseta");

      expect(result[0]).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        category: "camiseta",
        price: expect.any(Number),
        src: expect.any(String),
        createdAt: expect.any(String),
        quantitySold: expect.any(Number),
        description: expect.any(String),
      });
    });

    it("deve retornar nova instância do array e não modificar o original", () => {
      const originalProducts = [...mockProducts];
      const result = filterByCategory(mockProducts, "camiseta");

      expect(result).not.toBe(mockProducts); // Testa imutabilidade
      expect(mockProducts).toEqual(originalProducts); // Array original não modificado
    });
  });

  describe("filterByPage", () => {
    it("deve retornar 12 itens para a página 1 quando existem 20+ produtos", () => {
      const mockProducts = createMockProducts(24);
      const result = filterByPage(mockProducts, 1, 12);

      expect(result).toHaveLength(12);
      expect(result[0].id).toBe(1);
      expect(result[11].id).toBe(12);
    });

    it("deve retornar 12 itens para a página 2", () => {
      const mockProducts = createMockProducts(24);
      const result = filterByPage(mockProducts, 2, 12);

      expect(result).toHaveLength(12);
      expect(result[0].id).toBe(13);
      expect(result[11].id).toBe(24);
    });

    it("deve retornar 6 itens para a última página quando existem 18 produtos", () => {
      const mockProducts = createMockProducts(18);
      const result = filterByPage(mockProducts, 2, 12);

      expect(result).toHaveLength(6);
      expect(result[0].id).toBe(13);
      expect(result[5].id).toBe(18);
    });

    it("deve retornar array vazio para página 3 quando existem apenas 15 produtos", () => {
      const mockProducts = createMockProducts(15);
      const result = filterByPage(mockProducts, 3, itemsPerPage);

      expect(result).toHaveLength(0);
    });

    it("deve retornar todos os produtos quando total menor que itemsPerPage", () => {
      const mockProducts = createMockProducts(5);
      const result = filterByPage(mockProducts, 1, itemsPerPage);

      expect(result).toHaveLength(5);
      expect(result.map((p) => p.id)).toEqual([1, 2, 3, 4, 5]);
    });

    it("deve retornar array vazio quando não há produtos", () => {
      const result = filterByPage([], 1, itemsPerPage);
      expect(result).toHaveLength(0);
    });
  });

  describe("sortProducts", () => {
    const mockProducts: IProduct[] = createMockProducts(4);

    it("deve ordenar do mais recente para o mais antigo", () => {
      const sorted = sortProducts(mockProducts, "news");
      const dates = sorted.map((p) => new Date(p.createdAt).getTime());
      for (let i = 0; i < dates.length - 1; i++) {
        expect(dates[i]).toBeGreaterThanOrEqual(dates[i + 1]);
      }
      expect(sorted.map((p) => p.id)).toEqual([1, 2, 3, 4]);
    });

    it("deve manter ordem relativa quando datas são iguais", () => {
      const newMock: IProduct[] = [
        ...mockProducts,
        {
          ...mockProducts[0],
          id: 5,
        },
      ];
      const sorted = sortProducts(newMock, "news");
      const indexA = sorted.findIndex((p) => p.id === 1);
      const indexB = sorted.findIndex((p) => p.id === 5);
      expect(indexA).toBeLessThan(indexB);
      expect(sorted[0].id).toBe(1);
      expect(sorted[1].id).toBe(5);
      expect(sorted[2].id).toBe(2);
    });

    it("deve ordenar do maior para o menor preço", () => {
      const sorted = sortProducts(mockProducts, "highestPrice");

      const prices = sorted.map((p) => p.price);
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
      }

      expect(sorted.map((p) => p.id)).toEqual([4, 3, 2, 1]);
    });

    it("deve ordenar do menor para o maior preço", () => {
      const sorted = sortProducts(mockProducts, "lowestPrice");

      const prices = sorted.map((p) => p.price);
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
      }

      expect(sorted.map((p) => p.id)).toEqual([1, 2, 3, 4]);
    });

    it("deve ordenar por quantidade vendida decrescente", () => {
      const sorted = sortProducts(mockProducts, "bestSellers");

      const quantities = sorted.map((p) => p.quantitySold);
      for (let i = 0; i < quantities.length - 1; i++) {
        expect(quantities[i]).toBeGreaterThanOrEqual(quantities[i + 1]);
      }

      expect(sorted.map((p) => p.id)).toEqual([4, 3, 2, 1]);
    });

    it("deve manter a ordem original quando sortBy é undefined", () => {
      const sorted = sortProducts(mockProducts, undefined);
      expect(sorted.map((p) => p.id)).toEqual([1, 2, 3, 4]);
    });

    it("deve manter a ordem original para critério inválido", () => {
      const sorted = sortProducts(mockProducts, "invalid" as any);
      expect(sorted.map((p) => p.id)).toEqual([1, 2, 3, 4]);
    });
  });

  describe("searchProduct", () => {
    it("deve filtrar produtos por termo de busca", () => {
      const searchTerm = products[0].name.substring(0, 3);
      const result = searchProduct(products, searchTerm);
      expect(result.some((p) => p.name.includes(searchTerm))).toBe(true);
    });
  });
});
