import { GraphQLError } from 'graphql';
import type { CollectionArgs, Context } from './types';

export default async function resolveCollection(
  _obj: Record<string, any>,
  { id }: CollectionArgs,
  { restClient }: Context
) {
  const { data, errors } = await restClient.collection({ pathTemplateData: { id } });

  if (errors?.length) {
    throw new GraphQLError(`Failed to resolve collection ${id}.`);
  }

  return data;
}
