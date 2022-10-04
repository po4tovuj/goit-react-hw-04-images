import styled from '@emotion/styled';

export const Button = styled.button`
  border-radius: 5px;
  background-color: #fff;
  text-transform: capitalize;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 4px 16px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 12px;
  }
  &:hover {
    background-color: aquamarine;
  }
`;
