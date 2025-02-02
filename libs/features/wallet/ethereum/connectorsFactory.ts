import { InjectedConnector } from '@web3-react/injected-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { AbstractConnector } from '@web3-react/abstract-connector';
import fortmatic from './images/fortmaticIcon.png';
import metamask from './images/metamask.png';
import portis from './images/portisIcon.png';
import browserExtension from './images/arrow-right.svg';
import { EthereumConfig } from '@wrap-dapps/components/configuration';

export type EthConnector = {
  name: string;
  connector: AbstractConnector;
  iconName: string;
};

export type EthConnectors = {
  injected: EthConnector;
};

export default function connectorsFactory({
  networkId,
  formaticApiKey,
  portisDAppId,
}: EthereumConfig): EthConnectors {
  const { ethereum } = window as any;
  const isMetamask = ethereum && ethereum.isMetaMask;
  if (isMetamask && ethereum.providers && ethereum.providers.length > 1) {
    ethereum.selectedProvider = ethereum.providers.find(
      (provider) => provider.isMetaMask
    );
  }
  return {
    injected: {
      name: isMetamask ? 'Metamask' : 'Browser Extension',
      connector: new InjectedConnector({
        supportedChainIds: [networkId],
      }),
      iconName: isMetamask ? metamask : browserExtension,
    },
  };
}
