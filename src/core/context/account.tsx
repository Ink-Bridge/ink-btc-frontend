import keyring from '@polkadot/ui-keyring';
import { KeyringPair } from '@polkadot/keyring/types';
import React, { useMemo, useState } from 'react';
import { useApi } from '../hooks/use-api';
import { AccountContext } from './account-context';
export const AccountProvider: React.FC = ({ children }) => {
  const { isApiReady } = useApi();
  const [currentAccount, setCurrentAccount] = useState<KeyringPair>();

  useMemo(() => {
    if (!isApiReady) return;

    const accounts = keyring.getPairs();
    console.log('accounts', accounts);
    
    setCurrentAccount(accounts[1]);
  }, [isApiReady]);

  return <AccountContext.Provider value={{ currentAccount }}>{children}</AccountContext.Provider>;
};