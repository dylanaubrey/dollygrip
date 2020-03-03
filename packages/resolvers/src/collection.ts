import { hasChildFields } from "@graphql-box/helpers";
import { PlainObject } from "@repodog/types";
import { ResponseDataWithErrors } from "getta";
import { GraphQLError, GraphQLResolveInfo } from "graphql";
import { JsonObject } from "type-fest";
import { CollectionArgs, Context } from "./types";

export default async function resolveCollection(
  _obj: PlainObject,
  { id }: CollectionArgs,
  { restClient }: Context,
  { fieldNodes }: GraphQLResolveInfo,
) {
  const { errors, data } = await restClient.collection({ pathTemplateData: { id } });

  if (errors?.length) {
    throw new GraphQLError(`Failed to resolve ${id} collection.`);
  }

  const followOnRequests: Promise<ResponseDataWithErrors>[] = [];

  if (hasChildFields(fieldNodes[0], "backdrops") || hasChildFields(fieldNodes[0], "posters")) {
    followOnRequests.push(restClient.collection({ pathTemplateData: { id, "type?": "images" } }));
  }

  if (hasChildFields(fieldNodes[0], "translations")) {
    followOnRequests.push(restClient.collection({ pathTemplateData: { id, "type?": "translations" } }));
  }

  const results = await Promise.all(followOnRequests);

  return results.reduce((collectionData, result) => {
    if (result.errors?.length) {
      throw new GraphQLError(`Failed to resolve ${id} collection.`);
    }

    if (result.data) {
      collectionData = {
        ...collectionData,
        ...(result.data as JsonObject),
      };
    }

    return collectionData;
  }, data as JsonObject);
}
