import styled from "styled-components";

export const ButtonContainer = styled.div<{ $secondary: boolean }>`
  display: flex;
  border-radius: 4px;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.$secondary ? "#51B853" : "#115d8c")};
  color: #f5f5fa;
  padding: 0.625rem 0;
  gap: 0.75rem;
  cursor: pointer;

  font-weight: 500;
  font-size: 16px;
  text-transform: uppercase;

  svg {
    color: #f5f5fa;
  }

  &:hover {
    background-color: ${(props) =>
      props.$secondary ? "rgb(66, 156, 68)" : "rgb(13, 64, 95)"};
  }
  &:active {
    background-color: ${(props) =>
      props.$secondary ? "rgb(20, 184, 23)" : "rgb(14, 116, 180)"};
  }

  @media (max-width: 768px) {
    margin: 2rem 0;
  }
`;
