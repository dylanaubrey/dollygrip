import type { ReactChild } from 'react';
import type { Config } from '../../types';
import Context from './Context';

export type Props = {
  children: ReactChild;
  config: Config;
};

const Toolbelt = ({ children, config }: Props) => <Context.Provider value={{ config }}>{children}</Context.Provider>;

export default Toolbelt;
