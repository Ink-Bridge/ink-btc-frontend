import React, { FC, ReactElement, useState } from 'react';
import { useBridgeContract } from '../../core/hooks/use-bridge-contract';
import { useContractQuery } from '../../core/hooks/use-contract-query';
import { BackTo } from './back';
import { NoAddress } from './no-address';
import './request.css';
import { Send } from './send';

enum Phase {
  initial = 'initial',
  loading = 'loading',
  success = 'success',
  fail = 'fail',
}

export const Request: FC = (): ReactElement => {
  const [ phase, setPhase ] = useState<Phase>(Phase.initial);
  const { contract } = useBridgeContract();
  const { read } = useContractQuery({ contract, method: 'isTxConfirmed' });

  const handleEnter = () => {
    setPhase(Phase.loading);
    // read(txHash).then(() => setPhase(Phase.success),  () => setPhase(Phase.fail));
    (new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
        // reject();
      }, 1000);
    })).then(() => setPhase(Phase.success),  () => setPhase(Phase.fail));
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
            <Send />
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