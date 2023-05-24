/* @hash bafd7f6176785c5c05cce1a30e4635cc */
// tslint:disable
/* eslint-disable */
import {
  Client,
  Event,
  GetOptions,
  InvocationTransaction,
  InvokeReceipt,
  SmartContract,
  TransactionOptions,
  TransactionResult,
} from '@neo-one/client';

export interface HelloWorldHelloEventParameters {
  readonly name: string;
}
export interface HelloWorldHelloEvent extends Event<'hello', HelloWorldHelloEventParameters> {}
export type HelloWorldEvent = HelloWorldHelloEvent;

export interface HelloWorldSmartContract<TClient extends Client = Client>
  extends SmartContract<TClient, HelloWorldEvent> {
  readonly deploy: {
    (options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, HelloWorldEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, HelloWorldEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly hello: {
    (name: string, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<string, HelloWorldEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      name: string,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<string, HelloWorldEvent> & { readonly transaction: InvocationTransaction }>;
  };
}

export interface HelloWorldMigrationSmartContract {
  readonly deploy: (
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, HelloWorldEvent> & { readonly transaction: InvocationTransaction }>;
  readonly hello: (
    name: string | Promise<string>,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<string, HelloWorldEvent> & { readonly transaction: InvocationTransaction }>;
}
