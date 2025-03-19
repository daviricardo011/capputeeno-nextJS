import styled from "styled-components";

export const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  width: 100%;
  user-select: none;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #617480;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
`;
