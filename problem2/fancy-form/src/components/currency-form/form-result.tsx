import {FC} from "react";
import {StyledResult, StyledToken} from "./styled-form-result.ts";

export const FormResult: FC<{token: string, result: string}> = ({result, token}) => {
  return (
    <StyledResult>
      <StyledToken>{token}</StyledToken>
      {result}
    </StyledResult>
  );
};