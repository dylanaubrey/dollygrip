import { GraphQLError } from 'graphql';
import type { CertificationsArgs, Context } from './types';

export default async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _obj: Record<string, any>,
  { screenType }: CertificationsArgs,
  { restClient }: Context
) => {
  const { data, errors } = await restClient.certifications({ pathTemplateData: { type: screenType } });

  if (errors?.length) {
    throw new GraphQLError(`Failed to resolve ${screenType} certifications.`);
  }

  return data;
};
