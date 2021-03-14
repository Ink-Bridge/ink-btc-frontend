import React, { FC, ReactElement } from 'react';
import './send.css';
import SendTo from '../../assets/send.webp';

export const Send: FC<{ address: string }> = ({ address }): ReactElement => {
  return (
    <div className="area">
      <h2 id="title">SEND BTC TO THIS ADDRESS</h2>
      <div>
        <img className="send" src={SendTo} alt="" />
      </div>
      <div className="address">
        <span>
          { address }
        </span>
      </div>
      <div className="address-button">
        Copy Address
      </div>
    </div>
  );
};