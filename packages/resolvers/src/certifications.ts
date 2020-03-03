import { PlainObject } from "@repodog/types";
import { GraphQLError } from "graphql";
import { CertificationsArgs, Context } from "./types";

export default async function resolveCertifications(
  _obj: PlainObject,
  { screenType }: CertificationsArgs,
  { restClient }: Context,
) {
  const { errors, data } = await restClient.certifications({ pathTemplateData: { type: screenType } });

  if (errors?.length) {
    throw new GraphQLError(`Failed to resolve ${screenType} certifications.`);
  }

  return data;
}
