import { API_KEY } from './ravencoin-config';
import {
  BroadcastTransactionResponse,
  GetRawTransactionResponse,
  TatumBalance,
  TatumFees,
  TatumTransaction,
  TatumUtxo,
} from './ravencoin-types';

const tatumRequest = async <T = any>(
  path: string,
  customParams: RequestInit = {},
): Promise<T> => {
  if (!API_KEY) {
    throw new Error('API key is required');
  }

  const requestParams: RequestInit = {
    ...customParams,
    headers: {
      ...customParams.headers,
      accept: 'application/json',
      'x-api-key': API_KEY,
    },
  };

  const response = await fetch(`https://api.ravencoin.org${path}`, requestParams);

  const data = await response.json();
  return data;
};

export const getAllTxnsForAddress = (
  address: string,
): Promise<RavencoinTransaction[]> => {
  return ravencoinRequest<RavencoinTransaction[]>(
    `/v3/dogecoin/transaction/address/${address}?pageSize=50`,
  );
};

export const getBalanceForAddress = (
  address: string,
): Promise<RavencoinBalance> => {
  return ravencoinRequest<RavencoinBalance>(`/v3/dogecoin/address/balance/${address}`);
};

export const getTxByHash = (txHash: string): Promise<RavencoinTransaction> => {
  return ravencoinRequest<RavencoinTransaction>(`/v3/dogecoin/transaction/${txHash}`);
};

export const getUtxosForValue = (
  address: string,
  value: number,
): Promise<RavencoinUtxo[]> => {
  return ravencoinRequest<RavencoinUtxo[]>(
    `/v3/data/utxos?chain=doge-testnet&address=${address}&totalValue=${value}`,
  );
};

export const getFees = (): Promise<RavencoinFees> => {
  return ravencoinRequest<RavencoinFees>('/v3/blockchain/fee/DOGE');
};

export const getTransactionHex = async (txHash: string): Promise<string> => {
  const response = await ravencoinRequest<GetRawTransactionResponse>(
    '/v3/blockchain/node/doge-testnet',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'getrawtransaction',
        params: [txHash],
      }),
    },
  );

  return response.result;
};

export const broadcastSignedTransaction = (
  txData: string,
): Promise<BroadcastTransactionResponse> => {
  return ravencoinRequest<BroadcastTransactionResponse>('/v3/dogecoin/broadcast', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      txData,
    }),
  });
};
