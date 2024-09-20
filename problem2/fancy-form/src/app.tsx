import {useEffect, useState} from 'react';
import axios from 'axios';
import './styled-app.ts';
import {CurrencyForm} from './components/currency-form/currency-form.tsx';

export interface Token {
  currency: string
  date: string
  price: number
}

function App() {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    axios.get<Token[]>('https://interview.switcheo.com/prices.json')
      .then(response => {
        setTokens(response.data)
      })
      .catch(error => console.error('Error fetching prices:', error));
  }, []);

  return (
    <CurrencyForm tokens={tokens}/>
  );
}

export default App;