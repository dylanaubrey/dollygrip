import type { SearchConnectionInput } from '@dollygrip/schema';
import { GraphQLError } from 'graphql';
import type { SetRequired } from 'type-fest';
import type { Context } from './types';

export default async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _obj: Record<string, any>,
  { input }: { input: SetRequired<SearchConnectionInput, 'searchType'> },
  { restClient }: Context
) => {
  const { searchType, ...rest } = input;

  const { data, errors } = await restClient.search({
    pathTemplateData: { type: searchType?.toLowerCase() },
    queryParams: rest,
  });

  if (errors?.length) {
    throw new GraphQLError(`Failed to resolve ${searchType} search.`);
  }

  return data;
};
