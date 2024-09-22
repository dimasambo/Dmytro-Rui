import {
  StyledButton,
  StyledCurrenciesContainer,
  StyledForm, StyledSelectContainer, StyledSwapButton,
  StyledTitle,
  StyledWrapper
} from "./styled-currency-form.ts";
import {Controller, useForm} from "react-hook-form";
import {FC, useState} from "react";
import {Token} from "../../app";
import {getTokenIcon} from "../../utils/get-token-icon.ts";
import {Select, SelectOption} from "../form-components/select/select.tsx";
import {Input} from "../form-components/input/input.tsx";
import SwapIcon from '../../icons/swap-icon.svg';
import {TokenIcon} from "./token-icon.tsx";
import {FormResult} from "./form-result.tsx";

interface FormInputs {
  tokenFrom: string;
  tokenTo: string;
  amount: number;
}

export const CurrencyForm: FC<{ tokens: Token[] }> = ({tokens}) => {
  const [result, setResult] = useState<string>();

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: {errors}
  } = useForm<FormInputs>();
  let tokenFrom = watch('tokenFrom')
  let tokenTo = watch('tokenTo')

  const tokenOptions: SelectOption[] = tokens.map((token, index) => ({
    /* In future better add id to token object and not use index as a key anymore */
    id: index.toString(),
    value: token.currency,
    label: token.currency,
  }));

  const swapTokens = () => {
    if (tokenTo && tokenFrom) {
      setValue('tokenFrom', tokenTo)
      setValue('tokenTo', tokenFrom)
      result && handleSubmit(onSubmit)();
    }
  };

  const onSubmit = (data: FormInputs) => {
    const {tokenFrom, tokenTo, amount} = data;
    const tokenFromPrice = tokens.find(token => token.currency === tokenFrom)?.price;
    const tokenToPrice = tokens.find(token => token.currency === tokenTo)?.price;

    if (!tokenFromPrice || !tokenToPrice) {
      setResult(undefined);
      return;
    }

    const amountToReceive = (amount * tokenFromPrice) / tokenToPrice;
    setResult(amountToReceive.toFixed(4));
  };

  return (
    <StyledWrapper>
      <StyledTitle>Currency Converter</StyledTitle>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledCurrenciesContainer>

          <StyledSelectContainer>
            <TokenIcon
              token={tokenFrom}
              src={getTokenIcon(tokens.find(token => token.currency === tokenFrom)?.currency as string)}
            />
            <Controller
              name={'tokenFrom'}
              control={control}
              rules={{required: 'Please select a token'}}
              render={({field,}) => (
                <Select
                  {...field}
                  defaultOptionLabel={'Select...'}
                  options={tokenOptions.filter(option => option.value !== tokenTo)}
                  error={errors.tokenFrom?.message}
                />
              )}
            />
          </StyledSelectContainer>

          <StyledSwapButton onClick={(e) => {
            e.preventDefault();
            swapTokens();
          }}>
            <img src={SwapIcon} alt={'Swap'}/>
          </StyledSwapButton>

          <StyledSelectContainer>
            <Controller
              name={'tokenTo'}
              control={control}
              rules={{required: 'Please select a token'}}
              render={({field}) => (
                <Select
                  {...field}
                  defaultOptionLabel={'Select...'}
                  options={tokenOptions.filter(option => option.value !== tokenFrom)}
                  error={errors.tokenTo?.message}
                />
              )}
            />
            <TokenIcon
              token={tokenTo}
              src={getTokenIcon(tokens.find(token => token.currency === tokenTo)?.currency as string)}
            />
          </StyledSelectContainer>
        </StyledCurrenciesContainer>

        <Controller
          name={'amount'}
          control={control}
          rules={{
            required: 'Please enter an amount',
            min: {
              value: 0.01,
              message: 'Amount must be greater than 0'
            }
          }}
          render={
            ({field}) => (
              <Input
                {...field}
                placeholder={'Enter an amount here'}
                type="number"
                step="0.01"
                error={errors.amount?.message}
              />
            )
          }
        />

        <StyledButton type="submit">CONFIRM</StyledButton>

      </StyledForm>

      {result && <FormResult result={result} token={tokenTo}/>}
    </StyledWrapper>
  );
};