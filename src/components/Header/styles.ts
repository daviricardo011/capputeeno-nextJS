import styled from "styled-components";

export const HeaderContainer = styled.header`
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 10rem;
  position: fixed;
  width: 100%;
`;

export const Logo = styled.a`
  font-size: 2.5rem;
  margin: 0;
  font-family: "Saira Stencil One", sans-serif;
  color: #5d5d6d;
  cursor: pointer;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

export const SearchBar = styled.div`
  width: 22rem;
  background-color: #f3f5f6;
  border-radius: 8px;
  border: none;
  display: flex;
  align-items: center;
  padding: 0 1rem;

  > input {
    background-color: transparent;
    border: none;
    outline: none;
    width: 100%;
    height: 2.625rem;
    color: #000000;
  }

  > svg {
    color: #737380;
  }
`;

export const Cart = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  &:hover {
    text-decoration: underline;
  }

  > div {
    position: absolute;
    bottom: -2px;
    right: -9px;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;
    padding: 5px;
    border-radius: 10px;
    width: 20px;
    height: 20px;

    > span {
      font-size: 0.625rem;
      color: #fff;
      font-weight: 500;
      text-align: center;
    }
  }
`;
