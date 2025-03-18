import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  user-select: none;
  padding-bottom: 2rem;
`;

export const PaginationMenu = styled.nav`
  display: flex;
  gap: 0.125rem;
`;

export const NavButton = styled.a<{ $isActive?: boolean; disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 2rem;
  height: 2rem;
  border: ${(props) => (props.$isActive ? "solid 1px #FFA585" : "none")};
  background-color: ${(props) => (props.$isActive ? "none" : "#E9E9F0")};
  color: ${(props) =>
    props.$isActive ? "#FFA585" : props.disabled ? "#D9D9D9" : "#737380"};
`;
