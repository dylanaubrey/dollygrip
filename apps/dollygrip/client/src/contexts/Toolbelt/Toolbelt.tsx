import type Client from '@graphql-box/client';
import type { ReactChild } from 'react';
import type { Config } from '../../types';
import Context from './Context';

export type Props = {
  children: ReactChild;
  config: Config;
  graphqlBoxClient: Client;
};

const Toolbelt = ({ children, config, graphqlBoxClient }: Props) => (
  <Context.Provider value={{ config, graphqlBoxClient }}>{children}</Context.Provider>
);

export default Toolbelt;
