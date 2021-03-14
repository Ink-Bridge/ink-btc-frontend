import React, { FC, ReactElement, useState } from 'react';
import { useContractTx } from '../../core/hooks/use-contract-tx';
import { useExampleContract } from '../../core/hooks/use-example-contract';
import { BackTo } from './back';
import './verify.css';

enum Phase {
  initial = 'initial',
  loading = 'loading',
  success = 'success',
  fail = 'fail',
}

interface IProps {
  onVerified(txHash: string): void;
}

export const Verify: FC<IProps> = ({ onVerified }): ReactElement => {
  const [ txHash, setTxHash ] = useState<string>('');
  const [ phase, setPhase ] = useState<Phase>(Phase.initial);
  const { contract } = useExampleContract();
  const { execute } = useContractTx({ title: 'verify transaction', contract, method: 'pushTransaction' });

  const handleEnter = () => {
    if (phase !== Phase.initial || !txHash) {
      return;
    }
    setPhase(Phase.loading);
    execute(['', '']).then((e) => {
      console.log(e);
      setPhase(Phase.success);
    },  () => setPhase(Phase.fail));
    // (new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     // resolve(true);
    //     reject();
    //   }, 1000);
    // })).then(() => {
    //   setPhase(Phase.success);
    //   onVerified(txHash);
    // },  () => setPhase(Phase.fail));
  };

  const handleBack = () => {
    setPhase(Phase.initial);
  };

  return (
    <div className="area">
      {
        (phase === Phase.fail || phase === Phase.success) &&
          <BackTo onBack={handleBack} />
      }
      {
        phase === Phase.initial ?
          <input style={{ marginTop: '4.8rem' }} className="tx-hash-input" placeholder="Enter BTC transaction hash" value={txHash} onChange={ e => setTxHash(e.target.value) }/>
          :
          <div className="tx-hash" style={{ marginTop: phase === Phase.loading ? '4.8rem' : '2.4rem' }}>{ txHash }</div>
      }

      {
        phase === Phase.initial ?
          <div className="verify-button" onClick={handleEnter}>
            Verify
          </div>
          :
          (
            phase === Phase.loading ?
              <div className="verify-button">
                Verifying...
              </div>
              :
              (
                phase === Phase.success ?
                  <div className="verify-button verify-success">
                    Success
                  </div>
                  :
                  <div className="verify-button verify-fail">
                    Fail
                  </div>
              )
          )
        
      }
    </div>
  );
};
