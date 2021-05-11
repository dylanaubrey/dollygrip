import { createContext } from 'react';
import type { Config } from '../../types';

export type ToolbeltContext = {
  config: Config;
};

export default createContext<ToolbeltContext>({} as ToolbeltContext);
