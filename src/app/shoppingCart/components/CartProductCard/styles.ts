import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 211px;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
`;

export const ImageContainer = styled.div`
  width: 256px;
  position: relative;
`;
export const TextContainer = styled.div`
  padding: 1rem 1rem 1.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .qntAndPrice {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  > svg {
    color: #de3838;
    cursor: pointer;
  }
`;
export const ItemTitle = styled.h4`
  font-weight: 300;
  font-size: 20px;
`;
export const Description = styled.div`
  font-size: 12px;
`;

export const ItemPrice = styled.span`
  font-weight: 600;
  font-size: 16px;
`;
