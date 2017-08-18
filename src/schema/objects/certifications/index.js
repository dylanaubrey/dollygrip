import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

const Certification = new GraphQLObjectType({
  name: 'Certification',
  fields: () => ({
    certification: { type: GraphQLString },
    meaning: { type: GraphQLString },
    order: { type: GraphQLInt },
  }),
});

export default new GraphQLObjectType({
  name: 'Certifications',
  fields: () => ({
    AU: { type: new GraphQLList(Certification) },
    BR: { type: new GraphQLList(Certification) },
    CA: { type: new GraphQLList(Certification) },
    CAQC: { type: new GraphQLList(Certification) },
    DE: { type: new GraphQLList(Certification) },
    FR: { type: new GraphQLList(Certification) },
    GB: { type: new GraphQLList(Certification) },
    IN: { type: new GraphQLList(Certification) },
    KR: { type: new GraphQLList(Certification) },
    NL: { type: new GraphQLList(Certification) },
    NZ: { type: new GraphQLList(Certification) },
    PT: { type: new GraphQLList(Certification) },
    RU: { type: new GraphQLList(Certification) },
    SK: { type: new GraphQLList(Certification) },
    TH: { type: new GraphQLList(Certification) },
    US: { type: new GraphQLList(Certification) },
  }),
});
