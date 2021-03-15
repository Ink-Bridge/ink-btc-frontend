import { ContractPromise } from '@polkadot/api-contract';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useCallback, useState } from 'react';
import { useAccount } from './use-account';
import { useApi } from './use-api';

export type ContractTxProps = {
  contract: ContractPromise;
  method: string;
  title: string;
};

export const useContractTx = ({ contract, method }: ContractTxProps) => {
  const { api } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const { currentAccount } = useAccount();

  const queryEstimatedWeight = useCallback(
    async (fields: any[], value?: string) => {
      const { gasConsumed, result } = await contract.query[method](currentAccount!.address, { gasLimit: -1, value: value || '0' }, ...fields);
      return result.isOk ? gasConsumed : null;
    },
    [contract, currentAccount, method]
  );

  const execute = useCallback(
    async (fields: any[], value?: string) => {
      if (!currentAccount) {
        throw new Error('No Account');
      }

      setIsLoading(true);

      try {
        const estimatedGas = await queryEstimatedWeight(fields, value);
        const tx = contract.tx[method](
          {
            gasLimit: estimatedGas?.toBn() || '400000000000',
            value: value || 0
          },
          ...fields
        );
        console.log('estimatedGas', estimatedGas, currentAccount.address, estimatedGas?.toBn() || '400000000000');
        const injector = await web3FromSource(currentAccount.meta.source as any);
        console.log(currentAccount.meta.source, 'currentAccount.meta.source')
        await tx.signAndSend(currentAccount.address, { signer: injector.signer });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        throw error;
      }
    },
    [queryEstimatedWeight, api, contract, method, currentAccount]
  );

  return {
    isLoading,
    execute
  };
};
