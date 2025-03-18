import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  width: 100%;
  user-select: none;
`;

export const NavMenu = styled.nav`
  display: flex;
  gap: 2.5rem;
`;

export const NavItem = styled.a<{ $isActive: boolean }>`
  text-transform: uppercase;

  ${(props) =>
    props.$isActive &&
    css`
      border-bottom: solid 4px #ffa585;
    `}

  color: ${(props) => (props.$isActive ? "#41414D" : "#737380")};
`;

export const OrderDropdown = styled.div<{ $isOpened: boolean }>`
  position: relative;

  .button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #737380;
    cursor: pointer;
  }

  .screenBackground {
    display: ${({ $isOpened }) => ($isOpened ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .dropdown {
    display: ${(props) => (props.$isOpened ? "flex" : "none")};
    flex-direction: column;
    gap: 0.5rem;

    background-color: white;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    color: #737380;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);

    position: absolute;
    top: 35px;
    right: 0;
    z-index: 10;

    a {
      white-space: nowrap;
    }
  }
`;
