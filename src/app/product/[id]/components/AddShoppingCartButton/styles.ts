import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  border-radius: 4px;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #115d8c;
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
    background-color: rgb(13, 64, 95);
  }
  &:active {
    background-color: rgb(14, 116, 180)
  }
`;
