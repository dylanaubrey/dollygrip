import { Collection } from "@dollygrip/schema";
import { GraphQLError } from "graphql";
import { Context } from "./types";

export default async function resolveCollectionTranslations(
  { id }: Collection,
  _args: undefined,
  { restClient }: Context,
) {
  const { errors, data } = await restClient.collection({ pathTemplateData: { id, type: "translations" } });

  if (errors?.length) {
    throw new GraphQLError(`Failed to resolve collection ${id} translations.`);
  }

  return data;
}
