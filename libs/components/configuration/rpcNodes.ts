import { Environment, RPCNode } from './types';

export const rpcNodes: { [key in Environment]: RPCNode[] } = {
  MAINNET: [
    { name: 'Tezos Foundation', url: 'https://rpc.tzbeta.net/' },
    { name: 'ECAD Labs', url: 'https://mainnet.api.tez.ie' },
    { name: 'SmartPy', url: 'https://mainnet.smartpy.io' },
    { name: 'Giga Node', url: 'https://mainnet-tezos.giganode.io' },
  ],
  TESTNET: [
    { name: 'SmartPy', url: 'https://hangzhounet.smartpy.io' },
    { name: 'ECAD Labs', url: 'https://rpc.tzkt.io/hangzhou2net' },
  ],
};
