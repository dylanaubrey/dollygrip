import type { Collection } from '@dollygrip/schema';
import { GraphQLError } from 'graphql';
import type { Context } from './types';

export default async ({ id }: Collection, _args: undefined, { restClient }: Context) => {
  const { data, errors } = await restClient.collection({ pathTemplateData: { id, type: 'translations' } });

  if (errors?.length) {
    throw new GraphQLError(`Failed to resolve collection ${id} translations.`);
  }

  return data;
};
