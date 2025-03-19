import styled from "styled-components";

export const HeaderContainer = styled.header`
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: fixed;
  z-index: 10;

  @media (max-width: 768px) {
    padding-bottom: 1rem;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1120px;
  margin: 0 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Logo = styled.a`
  font-size: 2.5rem;
  margin: 0;
  font-family: "Saira Stencil One", sans-serif;
  color: #5d5d6d;
  cursor: pointer;
  user-select: none;
`;

export const LeftSection = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: space-between;
    width: 100%;
    form {
      width: 100%;
    }
  }
`;

export const SearchBar = styled.div`
  width: 22rem;

  background-color: #f3f5f6;
  border-radius: 8px;
  border: none;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;

  input {
    background-color: transparent;
    border: none;
    outline: none;
    width: 100%;
    height: 2.625rem;
    color: #000000;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;

    svg {
      color: #737380;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Cart = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  width: fit-content;

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
    width: 15px;
    height: 15px;

    > span {
      font-size: 0.625rem;
      color: #fff;
      font-weight: 500;
      text-align: center;
    }
  }

  @media (max-width: 768px) {
  }
`;
