import styled from "styled-components";

export const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 30px;
`;

export const StyledTitle = styled.h2`
  text-align: center;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 40px;
`;

export const StyledCurrenciesContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

export const StyledSelectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const StyledTokenIcon = styled.img`
  width: 40px;
  height: 40px;
`;

export const StyledSwapButton = styled.button`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 0;
  outline: 0;
  transition: .2s;
  cursor: pointer;
  background-color: transparent;

  &:hover {
    background-color: #f4f4f4;
  }

  &:active {
    background-color: #e8e8e8;
  }
`;

export const StyledButton = styled.button`
  padding: 12px;
  background-color: #4C59FFFF;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: .2s;

  &:disabled {
    background-color: #999;
  }

  &:hover {
    background-color: #3442ff;
  }

  &:active {
    background-color: #1a27ff;
  }
`;