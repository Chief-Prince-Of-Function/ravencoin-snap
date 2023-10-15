import { OnRpcRequestHandler } from '@metamask/snaps-types';
import {
  getAddress,
  getBalance,
  getTransactions,
  makeTransaction,
} from './rpc';
import { assertIsMakeTransactionParams } from './types';

export * from './rpc-types';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'raven_getAddress':
      return getAddress();

    case 'raven_getTransactions':
      return getTransactions();

    case 'raven_getBalance':
      return getBalance();

    case 'raven_makeTransaction':
      assertIsMakeTransactionParams(request.params);
      return makeTransaction(request.params);

    default:
      throw new Error('Method not found.');
  }
};
