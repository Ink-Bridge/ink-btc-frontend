import React, { FC, ReactElement, useState } from 'react';
import { BackTo } from './back';
import { NoAddress } from './no-address';
import './request.css';
import { Send } from './send';
import { useContractTx } from '../../core/hooks/use-contract-tx';
import { useExampleContract } from '../../core/hooks/use-example-contract';

enum Phase {
  initial = 'initial',
  loading = 'loading',
  success = 'success',
  fail = 'fail',
}

export const Request: FC = (): ReactElement => {
  const [ phase, setPhase ] = useState<Phase>(Phase.initial);
  const [ btcAddress, setBtcAddress ] = useState<string>('');
  const { contract } = useExampleContract();
  const { execute: requestBTCAddress } = useContractTx({ title: 'request btc address', contract, method: 'requestBtcDepositAddress' });

  const handleEnter = () => {
    setPhase(Phase.loading);
    requestBTCAddress([]).then((addr) => {
      console.log('addrrrrrrrrrrrr', addr)
      setBtcAddress(addr as any);
      setPhase(Phase.success);
    },  () => setPhase(Phase.fail));
  };

  const handleBack = () => {
    setPhase(Phase.initial);
  };

  return (
    <div className="area">
      {
        phase === Phase.initial &&
          <div className="request-button" onClick={handleEnter}>
            Request
          </div>
      }
      {
        phase === Phase.loading &&
          <div className="request-button">
            Requesting...
          </div>
      }
      
      {
        phase === Phase.success &&
          <div>
            <BackTo onBack={handleBack} />
            <Send address={btcAddress} />
          </div>
      }
      {
        phase === Phase.fail &&
          <div>
            <BackTo onBack={handleBack} />
            <NoAddress />
          </div>
      }
    </div>
  );
};