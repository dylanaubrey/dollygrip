import { Collection } from "@dollygrip/schema";
import { GraphQLError, GraphQLResolveInfo } from "graphql";
import { JsonObject } from "type-fest";
import { Context } from "./types";

export default async function resolveCollectionImages(
  { id }: Collection,
  _args: undefined,
  { restClient }: Context,
  { fieldName }: GraphQLResolveInfo,
) {
  const { errors, data } = await restClient.collection({ pathTemplateData: { id, type: "images" } });

  if (errors?.length) {
    throw new GraphQLError(`Failed to resolve collection ${id} images.`);
  }

  return (data as JsonObject)[fieldName];
}
