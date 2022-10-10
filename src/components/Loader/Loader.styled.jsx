import styled from '@emotion/styled';

export const StyledLoader = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 1.5s linear infinite;
  margin: 0 auto

@keyframes spin
  0%
    transform: rotate(0deg);

  100%
    transform: rotate(360deg);`;
