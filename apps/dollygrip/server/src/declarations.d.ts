declare namespace NodeJS {
  interface ProcessEnv {
    readonly CLIENT_PATH: string;
    readonly HTTPS: 'true' | 'false';
    readonly NODE_SSL_CA?: string;
    readonly NODE_SSL_CERT?: string;
    readonly NODE_SSL_KEY?: string;
    readonly PORT: string;
  }
}
