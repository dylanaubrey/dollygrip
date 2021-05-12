import type { PlainObjectMap, RequestOptions } from '@graphql-box/core';
import { useState } from 'react';
import useGraphqlBoxClient from './useGraphqlBoxClient';

const useQuery = (
  query: string
): [
  (opts: RequestOptions) => Promise<void>,
  boolean,
  Error | readonly Error[] | undefined,
  PlainObjectMap | null | undefined
] => {
  const graphqlBoxClient = useGraphqlBoxClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<PlainObjectMap | null | undefined>();
  const [errors, setErrors] = useState<Error | readonly Error[] | undefined>();

  const executeQuery = async (opts: RequestOptions) => {
    setLoading(true);
    const res = await graphqlBoxClient.request(query, opts);

    if (res.data) {
      setData(res.data);
    }

    if (res.errors) {
      setErrors(res.errors);
    }

    setLoading(false);
  };

  return [executeQuery, loading, errors, data];
};

export default useQuery;
