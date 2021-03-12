import { ApplicationAddr } from '../contracts/contract-address';
import { useContract } from './use-contract';
import BridgeAbi from '../contracts/btc_bridge.json';

export const useBridgeContract = () => {
  return useContract(ApplicationAddr, BridgeAbi);
};
