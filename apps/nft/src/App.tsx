import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import { useNotify } from '@wrap-dapps/components/notification';
import { NetworkType } from '@airgap/beacon-sdk';
import { NavBar } from '@wrap-dapps/components';
import { EthereumConfig } from '@wrap-dapps/components/wallet/ethereum/types';
import { Themed } from 'theme-ui';
import {
  TezosConnectionButton,
  TezosWalletProvider,
} from '@wrap-dapps/components/wallet/tezos';
import {
  EthereumConnectionButton,
  EthereumWalletProvider,
} from '@wrap-dapps/components/wallet/ethereum';

const App = () => {
  const notify = useNotify();
  const eth: EthereumConfig = {
    formaticApiKey: 'pk_test_BF45BDB36222B03F',
    networkId: 4,
    networkName: 'Rinkeby',
    portisDAppId: '6853a134-1ca9-458d-8b96-df6e25277781',
    rpcUrl: 'https://rinkeby.infura.io/v3/1915fb285d0747d9af84c7e106fdb443',
  };
  return (
    <TezosWalletProvider
      name={'Wonderfull Dapp'}
      notify={notify}
      rpcUrl={'https://florencenet.smartpy.io/'}
      networkType={NetworkType.FLORENCENET}
    >
      <EthereumWalletProvider config={eth}>
        <NavBar>
          <TezosConnectionButton />
          <EthereumConnectionButton />
        </NavBar>
        <Themed.h1>Hello</Themed.h1>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </EthereumWalletProvider>
    </TezosWalletProvider>
  );
};

export default App;
