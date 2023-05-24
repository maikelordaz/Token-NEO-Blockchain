/* @hash 0dca59d4b190f9514b07b98396dd3d13 */
// tslint:disable
/* eslint-disable */
import { Client } from '@neo-one/client';
import { HelloWorldSmartContract } from './types';
import { helloWorldABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
  networks: {
    local: {
      address: 'ATofJTmYRjCff7J1dg8FFW75Sh3dsjToVP',
    },
  },
  abi: helloWorldABI,
  sourceMaps,
};

export const createHelloWorldSmartContract = <TClient extends Client>(
  client: TClient,
): HelloWorldSmartContract<TClient> => client.smartContract(definition);
