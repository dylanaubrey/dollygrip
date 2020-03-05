import { PlainObject } from "@repodog/types";
import { GraphQLError } from "graphql";
import { CollectionArgs, Context } from "./types";

export default async function resolveCollection(_obj: PlainObject, { id }: CollectionArgs, { restClient }: Context) {
  const { errors, data } = await restClient.collection({ pathTemplateData: { id } });

  if (errors?.length) {
    throw new GraphQLError(`Failed to resolve collection ${id}.`);
  }

  return data;
}
