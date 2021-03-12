import React, { FC, ReactElement } from 'react';
import './send.css';
import Back from '../../assets/back.webp';
import SendTo from '../../assets/send.webp';

export const Send: FC = (): ReactElement => {
  return (
    <div className="area">
      <h2 id="title">SEND BTC TO THIS ADDRESS</h2>
      <div>
        <img className="send" src={SendTo} alt="" />
      </div>
      <div className="address">
        <span>
          3C4efA4gxox66N7KkDwUwpCU67qr4CLR8j
        </span>
      </div>
      <div className="address-button">
        Copy Address
      </div>
    </div>
  );
};