import {ComponentPropsWithoutRef, FC, forwardRef} from "react";
import {StyledErrorMessage, StyledLabel} from "../styled-form-components.ts";
import {StyledSelect} from "./styled-select.ts";

export interface SelectOption {
  id: string;
  value: string;
  label: string;
}

interface SelectProps extends ComponentPropsWithoutRef<'select'> {
  defaultOptionLabel: string,
  options: SelectOption[]
  error?: string
}

export const Select: FC<SelectProps> = forwardRef<HTMLSelectElement, SelectProps>(
  function SelectComponent({defaultOptionLabel, options, error, ...props}, ref) {
    return (
      <StyledLabel>
        <StyledSelect ref={ref} {...props}>
          <option value="">{defaultOptionLabel}</option>
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
      </StyledLabel>
    );
  });