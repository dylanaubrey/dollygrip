import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import MetadataType from '../metadata';
import Certifications from '../../classes/certifications';
import APINode from '../../interfaces/api-node';

const CertificationType = new GraphQLObjectType({
  name: 'Certification',
  fields: () => ({
    certification: { type: GraphQLString },
    meaning: { type: GraphQLString },
    order: { type: GraphQLInt },
  }),
});

export default new GraphQLObjectType({
  name: 'Certifications',
  interfaces: [APINode],
  fields: () => ({
    AU: { type: new GraphQLList(CertificationType) },
    BR: { type: new GraphQLList(CertificationType) },
    CA: { type: new GraphQLList(CertificationType) },
    CAQC: { type: new GraphQLList(CertificationType) },
    DE: { type: new GraphQLList(CertificationType) },
    FR: { type: new GraphQLList(CertificationType) },
    GB: { type: new GraphQLList(CertificationType) },
    IN: { type: new GraphQLList(CertificationType) },
    KR: { type: new GraphQLList(CertificationType) },
    NL: { type: new GraphQLList(CertificationType) },
    NZ: { type: new GraphQLList(CertificationType) },
    PT: { type: new GraphQLList(CertificationType) },
    RU: { type: new GraphQLList(CertificationType) },
    SK: { type: new GraphQLList(CertificationType) },
    TH: { type: new GraphQLList(CertificationType) },
    US: { type: new GraphQLList(CertificationType) },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof Certifications,
});
