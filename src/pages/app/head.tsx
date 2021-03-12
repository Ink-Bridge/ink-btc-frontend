import { FC, ReactElement } from 'react';
import './head.css';
import Logo from '../../assets/logo.webp';
export const Head: FC = (): ReactElement => {
  return (
    <div className="head">
      <img src={ Logo } alt="" />
    </div>
  );
};