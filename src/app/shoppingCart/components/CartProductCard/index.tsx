"use client";

import { IProduct } from "@/mocks/products";
import {
  Container,
  Description,
  ImageContainer,
  ItemHeader,
  ItemPrice,
  ItemTitle,
  TextContainer,
} from "./styles";
import { moneyMask } from "@/utils/functions";
import Image from "next/image";
import { HiOutlineTrash } from "react-icons/hi";
import DropdownQuantity from "@/components/DropdownQuantity";
import { useEffect, useState } from "react";

export interface IQntProduct extends IProduct {
  quantity: number;
}

interface Props {
  product: IQntProduct;
  changeQuantity: (id: number, quantity: number) => void;
}

export default function CartProductCard({ product, changeQuantity }: Props) {
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product]);

  const changeValue = (qnt: number) => {
    changeQuantity(product.id, qnt);
    setQuantity(qnt);
  };

  return (
    <Container>
      <ImageContainer>
        <Image
          src={product.src}
          alt={`${product.name} Imagem`}
          layout="fill"
          objectFit="cover"
          style={{
            borderTopLeftRadius: "4px",
            borderBottomLeftRadius: "4px",
          }}
        />
      </ImageContainer>
      <TextContainer>
        <div>
          <ItemHeader>
            <ItemTitle>{product.name}</ItemTitle>
            <HiOutlineTrash size={24} onClick={() => changeValue(0)} />
          </ItemHeader>
          <Description>{product.description}</Description>
        </div>
        <div className="qntAndPrice">
          <DropdownQuantity
            selectedValue={quantity}
            setSelectedValue={changeValue}
          />
          <ItemPrice>{moneyMask(product.price)}</ItemPrice>
        </div>
      </TextContainer>
    </Container>
  );
}
