import { GridProducts } from "@/components/GridProducts";
import { render, screen } from "@testing-library/react";

const mockChildren = [
  <div key="1">Produto 1</div>,
  <div key="2">Produto 2</div>,
  <div key="3">Produto 3</div>,
  <div key="4">Produto 4</div>,
  <div key="5">Produto 5</div>,
  <div key="6">Produto 6</div>,
  <div key="7">Produto 7</div>,
];

describe("GridProducts", () => {
  it("deve renderizar os filhos corretamente", () => {
    render(<GridProducts>{mockChildren}</GridProducts>);

    expect(screen.getByText("Produto 1")).toBeVisible();
    expect(screen.getByText("Produto 2")).toBeVisible();
    expect(screen.getByText("Produto 3")).toBeVisible();
  });
});
