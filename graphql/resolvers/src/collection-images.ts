import type { Collection } from '@dollygrip/schema';
import type { GraphQLResolveInfo } from 'graphql';
import { GraphQLError } from 'graphql';
import type { JsonObject } from 'type-fest';
import type { Context } from './types';

export default async function resolveCollectionImages(
  { id }: Collection,
  _args: undefined,
  { restClient }: Context,
  { fieldName }: GraphQLResolveInfo
) {
  const { data, errors } = await restClient.collection({ pathTemplateData: { id, type: 'images' } });

  if (errors?.length) {
    throw new GraphQLError(`Failed to resolve collection ${id} images.`);
  }

  return (data as JsonObject)[fieldName];
}
