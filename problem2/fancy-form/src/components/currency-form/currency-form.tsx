import {Form, Wrapper, Label, ErrorMessage, Input, Button, SwapResult} from "./styled-currency-form.ts";
import {useForm} from "react-hook-form";
import {FC, useState} from "react";
import {Token} from "../../app";
import {getTokenIcon} from "../../utils/get-token-icon.ts";

interface FormInputs {
  tokenFrom: string;
  tokenTo: string;
  amount: number;
}

export const CurrencyForm: FC<{ tokens: Token[] }> = ({tokens}) => {
  const [swapResult, setSwapResult] = useState('');

  const {register, handleSubmit, watch, formState: {errors}} = useForm<FormInputs>();
  const tokenFrom = watch('tokenFrom')
  const tokenTo = watch('tokenTo')

  const onSubmit = (data: FormInputs) => {
    const {tokenFrom, tokenTo, amount} = data;
    const tokenFromPrice = tokens.find(token => token.currency === tokenFrom)?.price;
    const tokenToPrice = tokens.find(token => token.currency === tokenTo)?.price;

    if (!tokenFromPrice || !tokenToPrice) {
      setSwapResult('Invalid token selection.');
      return;
    }

    const amountToReceive = (amount * tokenFromPrice) / tokenToPrice;
    setSwapResult(`You will receive ${amountToReceive.toFixed(4)} ${tokenTo}`);
  };

  return (
    <Wrapper>
      <h3>Currency Swap</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="tokenFrom">From Currency</Label>
        {tokenFrom ? <img src={getTokenIcon(tokens.find(token => token.currency === tokenFrom)?.currency as string)}
                          alt={'token-icon'}/> : null}
        <select id="tokenFrom" {...register('tokenFrom', {required: 'Please select a token'})}>
          <option value="">Select a token</option>
          {/* In future better not use index as a key when object contains id */}
          {tokens.map((token, index) => (
            <option key={index} value={token.currency}>
              {token.currency}
            </option>
          ))}
        </select>
        {errors.tokenFrom && <ErrorMessage>{errors.tokenFrom.message}</ErrorMessage>}

        <Label htmlFor="tokenTo">To Currency</Label>
        {tokenTo ? <img src={getTokenIcon(tokens.find(token => token.currency === tokenTo)?.currency as string)}
                        alt={'token-icon'}/> : null}
        <select id="tokenTo" {...register('tokenTo', {required: 'Please select a token'})}>
          <option value="">Select a token</option>
          {/* In future better not use index as a key when object contains id */}
          {tokens.map((token, index) => (
            <option key={index} value={token.currency}>
              {token.currency}
            </option>
          ))}
        </select>
        {errors.tokenTo && <ErrorMessage>{errors.tokenTo.message}</ErrorMessage>}

        <Label htmlFor="amount">Amount to send</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          {...register('amount', {
            required: 'Please enter an amount',
            min: {value: 0.01, message: 'Amount must be greater than 0'}
          })}
        />
        {errors.amount && <ErrorMessage>{errors.amount.message}</ErrorMessage>}

        <Button type="submit">CONFIRM SWAP</Button>
      </Form>

      {swapResult && <SwapResult>{swapResult}</SwapResult>}
    </Wrapper>
  );
};