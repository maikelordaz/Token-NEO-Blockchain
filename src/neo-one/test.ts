/* @hash 4cd33890ac583ba2adf387fb28772ee3 */
// tslint:disable
/* eslint-disable */
import { createWithContracts, TestOptions, WithContractsOptions } from '@neo-one/smart-contract-test';
import { Contracts } from './contracts';
import * as path from 'path';

export const withContracts: (
  test: (contracts: Contracts & TestOptions) => Promise<void>,
  options?: WithContractsOptions,
) => Promise<void> = createWithContracts([
  { name: 'HelloWorld', filePath: path.resolve(__dirname, '../../neo-one/contracts/HelloWorld.ts') },
  { name: 'Token', filePath: path.resolve(__dirname, '../../neo-one/contracts/Token.ts') },
]);
