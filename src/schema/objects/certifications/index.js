import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import MetadataType from '../metadata';
import Certifications from '../../classes/certifications';
import APINodeInterface from '../../interfaces/api-node';

const CertificationType = new GraphQLObjectType({
  name: 'Certification',
  fields: () => ({
    certification: { type: new GraphQLNonNull(GraphQLString) },
    meaning: { type: new GraphQLNonNull(GraphQLString) },
    order: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

export default new GraphQLObjectType({
  name: 'Certifications',
  interfaces: [APINodeInterface],
  fields: () => ({
    AU: { type: new GraphQLList(CertificationType) },
    BR: { type: new GraphQLList(CertificationType) },
    CA: { type: new GraphQLList(CertificationType) },
    CAQC: { type: new GraphQLList(CertificationType), resolve: obj => obj['CA-QC'] },
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
