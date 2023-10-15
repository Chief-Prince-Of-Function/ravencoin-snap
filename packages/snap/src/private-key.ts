import { BIP44Node, getBIP44AddressKeyDeriver } from '@metamask/key-tree';

/**
 * Derive the single account we're using for this snap.
 * The path of the account is m/44'/1'/0'/0/0.
 */
export const getAccount = async (): Promise<BIP44Node> => {
  const ravencoinNode = await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: 175, // 1 is for all Testnets
    },
  });

  const deriveRavencoinPrivateKey = await getBIP44AddressKeyDeriver(
    ravencoinNode,
  );

  return deriveRavencoinPrivateKey(0);
};
