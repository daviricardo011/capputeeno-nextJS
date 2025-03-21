import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  width: 352px;
  height: 85%;
  background-color: #fff;
  padding: 1rem 1.5rem 1.5rem;
  margin-top: -1rem;
  position: fixed;
  right: calc((100% - 1120px + 1rem) / 2);

  @media (max-width: 1200px) {
    position: static;
    width: 100%;
    margin-bottom: 3rem;
  }
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.h2`
  font-weight: 600;
  font-size: 20px;
`;

export const TotalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 2rem 0 2.5rem;
`;

export const TotalText = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TotalTitle = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

export const HorizontalLine = styled.div`
  background-color: #dce2e5;
  margin: 0.5rem 0;
  height: 1px;
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  > a {
    font-weight: 500;
    font-size: 14px;
    text-decoration: underline;
    color: #737380;
    text-transform: uppercase;
  }
`;
