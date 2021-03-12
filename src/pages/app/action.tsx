import React, { FC, ReactElement } from 'react';
import './action.css';
import { Request } from './request';
import { Send } from './send';
import { NoAddress } from './no-address';

export const Action: FC = (): ReactElement => {
  return (
    <div className="action">
      <div className="tabs">
        <div className="tab-title request-tab-title">Request Address</div>
        <div className="tab-title verify-tab-title">Verify</div>
      </div>
      <div className="action-container">
        {/* <Request /> */}
        {/* <Send /> */}
        <NoAddress />
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