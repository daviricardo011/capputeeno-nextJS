"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Container, PaginationMenu, NavButton } from "./styles";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { IProduct } from "@/mocks/products";

interface Props {
  products: IProduct[];
  itemsPerPage: number;
}

export default function Pagination({ products, itemsPerPage }: Props) {
  const searchParams = useSearchParams();
  const actualPage = Number(searchParams.get("page") || 1);
  const actualCategory = searchParams.get("category") || "";

  const filteredProducts = useMemo(() => {
    if (actualCategory && actualCategory !== "Todos os produtos") {
      return products.filter((prod) => prod.category === actualCategory);
    }
    return products;
  }, [products, actualCategory]);

  const pagesQuantity = useMemo(() => {
    return Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  }, [filteredProducts, itemsPerPage]);

  const pageButtons = useMemo(() => {
    return Array.from({ length: pagesQuantity }, (_, i) => i + 1);
  }, [pagesQuantity]);

  const isLastPage = pagesQuantity === actualPage;
  const isFirstPage = actualPage === 1;

  const updatePageParam = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    return `/?${params.toString()}`;
  };

  return (
    <Container>
      <PaginationMenu data-testid="pagination-menu">
        {pageButtons.map((page) => (
          <NavButton
            key={page}
            $isActive={actualPage === page}
            href={updatePageParam(page)}
            data-testid={`page-button-${page}`}
          >
            {page}
          </NavButton>
        ))}
        <NavButton
          $isActive={false}
          disabled={isFirstPage}
          href={isFirstPage ? undefined : updatePageParam(actualPage - 1)}
          data-testid="prev-page-button"
        >
          <IoIosArrowBack />
        </NavButton>
        <NavButton
          $isActive={false}
          disabled={isLastPage}
          href={isLastPage ? undefined : updatePageParam(actualPage + 1)}
          data-testid="next-page-button"
        >
          <IoIosArrowForward />
        </NavButton>
      </PaginationMenu>
    </Container>
  );
}
