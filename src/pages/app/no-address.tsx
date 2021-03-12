import React, { FC, ReactElement } from 'react';
import './send.css';
import Back from '../../assets/back.webp';

export const NoAddress: FC = (): ReactElement => {
  return (
    <div className="area">
      <div className="back-area">
        <div className="back-holder">
          <img src={Back} alt="" />
          <span className="back">Back</span>
        </div>
      </div>
     
    </div>
  );
};