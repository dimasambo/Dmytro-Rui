import React, { useMemo } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
}

// Better extend the WalletBalance
// as FormattedWalletBalance contains its properties
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

// Better to use enum, it makes the
// blockchain priorities much easier to maintain
enum BlockchainPriority {
  Osmosis = 100,
  Ethereum = 50,
  Arbitrum = 30,
  Zilliqa = 20,
  Neo = 20,
  Default = -99,
}

const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  // I assume we have type for blockchain
  const getPriority = (blockchain: BlockchainType): number => {
    return BlockchainPriority[blockchain] ?? BlockchainPriority.Default;
  };

  // Here we are directly returning filtered and
  // sorted balances, so readability is better
  // and no nested conditions.
  // Removed unnecessary lhsPriority check in favor of a clearer condition.
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const priority = getPriority(balance.blockchain);
        return priority > BlockchainPriority.Default && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) =>
        getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      );
  }, [balances]);


  // Better to use a separate function to format
  // the balance, it increases clarity
  const formatBalance = (balance: WalletBalance): FormattedWalletBalance => ({
    ...balance,
    formatted: balance.amount.toFixed(2),
  });

  const formattedBalances = useMemo(
    () => sortedBalances.map(formatBalance),
    [sortedBalances]
  );

  return (
    <div {...rest}>
      {formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            className={classes.row}
            /* Better not use index as a key ensuring,
            because React handles rendering less efficiently. */
            key={balance.currency}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      })}
    </div>
  );
};