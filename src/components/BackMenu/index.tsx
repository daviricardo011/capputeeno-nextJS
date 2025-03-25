"use client";

import { useRouter } from "next/navigation";
import { Container, NavItem } from "./styles";
import Image from "next/image";

export default function BackMenu() {
  const router = useRouter();

  return (
    <Container>
      <NavItem onClick={() => router.back()} data-testid={"backButton"}>
        <Image src="/backwardIcon.svg" width={24} height={24} alt={"Voltar"} />
        <span>Voltar</span>
      </NavItem>
    </Container>
  );
}
