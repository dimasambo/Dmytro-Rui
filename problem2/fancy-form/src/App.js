import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import './App.css';

const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 1rem;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #999;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 0.5rem;
`;

const SwapResult = styled.p`
  margin-top: 1rem;
  font-size: 16px;
`;

function App() {
    const [tokenPrices, setTokenPrices] = useState({});
    const [swapResult, setSwapResult] = useState('');
    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    useEffect(() => {
        axios.get('https://interview.switcheo.com/prices.json')
            .then(response => setTokenPrices(response.data))
            .catch(error => console.error('Error fetching prices:', error));
    }, []);

    const onSubmit = (data) => {
        const {inputAmount, fromToken, toToken} = data;
        const fromTokenPrice = tokenPrices[fromToken];
        const toTokenPrice = tokenPrices[toToken];

        if (!fromTokenPrice || !toTokenPrice) {
            setSwapResult('Invalid token selection.');
            return;
        }

        const amountToReceive = (inputAmount * fromTokenPrice) / toTokenPrice;
        setSwapResult(`You will receive ${amountToReceive.toFixed(4)} ${toToken}`);
    };

    return (
        <Wrapper>
            <h3>Currency Swap</h3>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor="fromToken">From Currency</Label>
                <select id="fromToken" {...register('fromToken', {required: 'Please select a token'})}>
                    <option value="">Select a token</option>
                    {Object.keys(tokenPrices).map(token => (
                        <option key={token} value={token}>{token}</option>
                    ))}
                </select>
                {errors.fromToken && <ErrorMessage>{errors.fromToken.message}</ErrorMessage>}

                <Label htmlFor="toToken">To Currency</Label>
                <select id="toToken" {...register('toToken', {required: 'Please select a token'})}>
                    <option value="">Select a token</option>
                    {Object.keys(tokenPrices).map(token => (
                        <option key={token} value={token}>{token}</option>
                    ))}
                </select>
                {errors.toToken && <ErrorMessage>{errors.toToken.message}</ErrorMessage>}

                <Label htmlFor="inputAmount">Amount to send</Label>
                <Input
                    id="inputAmount"
                    type="number"
                    step="0.01"
                    {...register('inputAmount', {
                        required: 'Please enter an amount',
                        min: {value: 0.01, message: 'Amount must be greater than 0'}
                    })}
                />
                {errors.inputAmount && <ErrorMessage>{errors.inputAmount.message}</ErrorMessage>}

                <Button type="submit">CONFIRM SWAP</Button>
            </Form>

            {swapResult && <SwapResult>{swapResult}</SwapResult>}
        </Wrapper>
    );
}

export default App;