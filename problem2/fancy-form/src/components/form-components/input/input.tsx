import {ComponentProps, forwardRef} from "react";
import {StyledInput} from "./styled-input.ts";
import {StyledErrorMessage, StyledLabel} from "../styled-form-components.ts";

interface InputProps extends ComponentProps<'input'> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function InputComponent({error, ...props}, ref) {
    return (
      <StyledLabel>
        <StyledInput ref={ref} {...props} />
        {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
      </StyledLabel>
    );
  });