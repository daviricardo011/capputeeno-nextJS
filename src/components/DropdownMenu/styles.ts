import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const DropdownButton = styled.div<{ $isOpened: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #737380;
  cursor: pointer;
`;

export const Options = styled.div<{
  $isOpened: boolean;
  position: "left" | "right";
}>`
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
  ${({ position }) => (position === "right" ? "right: 0;" : "left: 0;")}
  z-index: 10;

  a {
    white-space: nowrap;
  }
`;

export const ScreenBackground = styled.div<{ $isOpened: boolean }>`
  display: ${({ $isOpened }) => ($isOpened ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9;
`;
