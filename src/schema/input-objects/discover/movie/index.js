import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import MovieSortByType, { DEFAULT_VALUE } from '../../../enum/sort-by/movie';

export default new GraphQLInputObjectType({
  name: 'DiscoverMovieInput',
  fields: () => ({
    region: { type: GraphQLString },
    sortBy: { defaultValue: DEFAULT_VALUE, type: MovieSortByType },
    certificationCountry: { type: GraphQLString },
    certification: { type: GraphQLString },
    certificationLT: { type: GraphQLString },
    includeAdult: { defaultValue: false, type: GraphQLBoolean },
    includeVideo: { defaultValue: false, type: GraphQLBoolean },
    primaryReleaseYear: { type: GraphQLInt },
    primaryReleaseDateGT: { type: GraphQLString },
    primaryReleaseDateLT: { type: GraphQLString },
    releaseDateGT: { type: GraphQLString },
    releaseDateLT: { type: GraphQLString },
    voteCountGT: { type: GraphQLInt },
    voteCountLT: { type: GraphQLInt },
    voteAverageGT: { type: GraphQLFloat },
    voteAverageLT: { type: GraphQLFloat },
    withCast: { type: GraphQLString },
    withCrew: { type: GraphQLString },
    withCompanies: { type: GraphQLString },
    withGenres: { type: GraphQLString },
    withKeywords: { type: GraphQLString },
    withPeople: { type: GraphQLString },
    year: { type: GraphQLInt },
    withoutGenres: { type: GraphQLString },
    withRuntimeGT: { type: GraphQLInt },
    withRuntimeLT: { type: GraphQLInt },
    withReleaseType: { type: GraphQLInt },
    withOriginalLanguage: { type: GraphQLString },
    withoutKeywords: { type: GraphQLString },
  }),
});
