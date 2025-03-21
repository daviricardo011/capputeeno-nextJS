import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 211px;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  background-color: #ffffff;
  border-radius: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: fit-content;
  }
`;

export const ImageContainer = styled.div`
  width: 256px;
  height: 211px;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
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

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 1rem;
    padding-top: 0;
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

  @media (max-width: 768px) {
    max-width: 60%;
  }
`;
export const Description = styled.p`
  font-size: 12px;

  @media (max-width: 768px) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ItemPrice = styled.span`
  font-weight: 600;
  font-size: 16px;
`;
