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
        const seenCurrencies = new Set<string>();

        const filteredTokens = response.data.filter(item => {
          // Exclude token with no price
          if (!item.price) return false;

          // I noticed that there are duplicate currencies in the response, so I'm filtering them out.
          // If these duplicates are needed, we can remove next lines.
          if (seenCurrencies.has(item.currency)) {
            return false;
          }
          seenCurrencies.add(item.currency);
          return true;
        });

        setTokens(filteredTokens)
      })
      .catch(error => console.error('Error fetching prices:', error));
  }, []);

  return (
    <CurrencyForm tokens={tokens}/>
  );
}

export default App;