import { InjectedConnector } from '@web3-react/injected-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { EthereumConfig } from './types';
import { AbstractConnector } from '@web3-react/abstract-connector';
import fortmatic from './fortmaticIcon.png';
import metamask from './metamask.png';
import portis from './portisIcon.png';

export type EthConnector = {
  name: string;
  connector: AbstractConnector;
  iconName: string;
};

export type EthConnectors = {
  injected: EthConnector;
  fortmatic: EthConnector;
  portis: EthConnector;
};

export default function connectorsFactory({
  networkId,
  formaticApiKey,
  portisDAppId,
}: EthereumConfig): EthConnectors {
  const { ethereum } = window as any;
  const isMetamask = ethereum && ethereum.isMetaMask;
  return {
    injected: {
      name: isMetamask ? 'Metamask' : 'Browser Extension',
      connector: new InjectedConnector({
        supportedChainIds: [networkId],
      }),
      iconName: isMetamask ? metamask : 'arrow-right.svg',
    },
    fortmatic: {
      name: 'Fortmatic',
      connector: new FortmaticConnector({
        apiKey: formaticApiKey,
        chainId: networkId,
      }),
      iconName: fortmatic,
    },
    portis: {
      name: 'Portis',
      connector: new PortisConnector({
        dAppId: portisDAppId,
        networks: [networkId],
      }),
      iconName: portis,
    },
  };
}