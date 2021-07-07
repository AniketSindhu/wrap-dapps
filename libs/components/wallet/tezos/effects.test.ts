import { activate, deactivate, TezosWallet } from './effects';
import {
  TezosToolkit,
  WalletDelegateParams,
  WalletOriginateParams,
  WalletProvider,
  WalletTransferParams,
} from '@taquito/taquito';
import { connectAction, disconnectAction } from './state';
import { NetworkType } from '@airgap/beacon-sdk';
import { NotificationLevel, Notify } from '../../notification/types';

function aTezosWallet(account: string, publicKey: string): TezosWallet {
  const provider: WalletProvider = {
    getPKH(): Promise<string> {
      return Promise.resolve('');
    },
    mapDelegateParamsToWalletParams(
      params: WalletDelegateParams
    ): Promise<any> {
      return Promise.resolve(undefined);
    },
    mapOriginateParamsToWalletParams(
      params: WalletOriginateParams
    ): Promise<any> {
      return Promise.resolve(undefined);
    },
    mapTransferParamsToWalletParams(
      params: WalletTransferParams
    ): Promise<any> {
      return Promise.resolve(undefined);
    },
    sendOperations(params: any[]): Promise<string> {
      return Promise.resolve('');
    },
  };

  return {
    connect: jest.fn(() =>
      Promise.resolve([{ address: account, publicKey }, provider])
    ),
    disconnect: jest.fn(),
  };
}

const dispatch = jest.fn();
const notify = jest.fn();

describe('activate function', () => {
  test('should dispatch connection is starting', async () => {
    const wallet = aTezosWallet('nop', "don't care");
    const doActivate = activate(dispatch, wallet, notify);

    await doActivate({
      network: { type: NetworkType.GRANADANET, rpcUrl: '' },
      scopes: [],
    });

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toBeCalledWith(connectAction.started(undefined));
  });

  test('should dispatch tezos account if everything goes well', async () => {
    const wallet = aTezosWallet('wonderful account', 'publicKey');
    const doActivate = activate(dispatch, wallet, notify);
    const request = {
      network: { type: NetworkType.GRANADANET, rpcUrl: 'zeUrl' },
      scopes: [],
    };

    await doActivate(request);

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toBeCalledWith(
      connectAction.done({
        result: {
          account: 'wonderful account',
          tezosToolkit: expect.any(TezosToolkit),
          network: NetworkType.GRANADANET,
        },
      })
    );
    expect(wallet.connect).toHaveBeenCalledWith(request);
    const action = dispatch.mock.calls[1][0];
    const {
      result: { tezosToolkit },
    } = action.payload;
    expect(tezosToolkit._rpc).toEqual('zeUrl');
  });

  test('should dispatch connection fail', async () => {
    const wallet = aTezosWallet('wonderful account', 'publicKey');
    wallet.connect = () => Promise.reject(new Error('nop'));
    const doActivate = activate(dispatch, wallet, notify);
    const request = {
      network: { type: NetworkType.GRANADANET, rpcUrl: 'zeUrl' },
      scopes: [],
    };

    await doActivate(request);

    expect(dispatch).toHaveBeenCalledWith(
      connectAction.failed({ error: 'nop' })
    );
    expect(notify).toHaveBeenCalledWith(
      NotificationLevel.ERROR,
      'Could not connect to your wallet'
    );
  });
});

describe('deactivate function', () => {
  test('should dispatch disconnect', async () => {
    await deactivate(dispatch, aTezosWallet('nop', "don't care"))();

    expect(dispatch).toHaveBeenCalledWith(disconnectAction());
  });

  test('should disconnect current wallet', () => {
    const aWallet = aTezosWallet('nop', "don't care");

    deactivate(dispatch, aWallet)();

    expect(aWallet.disconnect).toHaveBeenCalled();
  });
});
