import React, { FC, ReactElement, useMemo, useState } from 'react';
import './action.css';
import { Request } from './request';
import { Verify } from './verify';

enum TabChoosed {
  request = 'request',
  verify = 'verify',
}

export const Action: FC = (): ReactElement => {
  const [ tab, setTab ] = useState<TabChoosed>(TabChoosed.request);

  const handleVerified = (txHash: string) => {

  };
  useMemo(() => console.log(tab, 'tab'), [tab]);

  return (
    <div className="action">
      <div className="tabs">
        <div
          onClick={ () => setTab(TabChoosed.request) }
          className="tab-title request-tab-title"
          style={{ background: tab === TabChoosed.request ? '#F7931A' : '#535353' }}>
            Request Address
        </div>
        <div
          onClick={ () => setTab(TabChoosed.verify) }
          className="tab-title verify-tab-title"
          style={{ background: tab === TabChoosed.verify ? '#F7931A' : '#535353' }}>
            Verify
        </div>
      </div>
      <div className="action-container">
        {
          tab === TabChoosed.request ?
            <Request />
            :
            <Verify onVerified={ handleVerified }/>
        }
        <div className="balance-area">
          <span className="balance-title">inkBTC balance</span>
          <div className="balance">
            <span>0.00618456</span>
          </div>
        </div>
      </div>
    </div>
  );
};