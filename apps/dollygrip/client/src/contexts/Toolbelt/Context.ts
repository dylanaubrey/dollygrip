import type Client from '@graphql-box/client';
import { createContext } from 'react';
import type { Config } from '../../types';

export type ToolbeltContext = {
  config: Config;
  graphqlBoxClient: Client;
};

export default createContext<ToolbeltContext>({} as ToolbeltContext);
