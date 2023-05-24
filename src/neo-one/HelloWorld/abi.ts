/* @hash bb172670cc95632feead5288634e9aa4 */
// tslint:disable
/* eslint-disable */
import { ABI } from '@neo-one/client';

export const helloWorldABI: ABI = {
  events: [
    {
      name: 'hello',
      parameters: [
        {
          forwardedValue: false,
          name: 'name',
          optional: false,
          type: 'String',
        },
      ],
    },
  ],
  functions: [
    {
      claim: false,
      constant: false,
      name: 'hello',
      parameters: [
        {
          forwardedValue: false,
          name: 'name',
          optional: false,
          type: 'String',
        },
      ],
      receive: false,
      returnType: {
        forwardedValue: false,
        optional: false,
        type: 'String',
      },
      send: false,
      sendUnsafe: false,
    },
    {
      name: 'deploy',
      parameters: [],
      returnType: {
        type: 'Boolean',
      },
    },
  ],
};
