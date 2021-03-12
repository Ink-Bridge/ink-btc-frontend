import React, { FC, ReactElement } from 'react';
import './no-address.css';
import Back from '../../assets/back.webp';

export const NoAddress: FC = (): ReactElement => {
  return (
    <div className="area">
      <div className="no-address">
        <span>—— No address Available ——</span>
      </div>
    </div>
  );
};