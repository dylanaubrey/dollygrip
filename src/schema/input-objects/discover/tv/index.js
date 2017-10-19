import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import TvSortByType, { DEFAULT_VALUE } from '../../../enum/sort-by/tv';

export default new GraphQLInputObjectType({
  name: 'DiscoverTvInput',
  fields: () => ({
    sortBy: { defaultValue: DEFAULT_VALUE, type: TvSortByType },
    primaryReleaseYear: { type: GraphQLInt },
    airDateGT: { type: GraphQLString },
    airDateLT: { type: GraphQLString },
    firstAirDateGT: { type: GraphQLString },
    firstAirDateLT: { type: GraphQLString },
    firstAirDateYear: { type: GraphQLInt },
    timezone: { defaultValue: 'America/New_York', type: GraphQLString },
    voteAverageGT: { type: GraphQLFloat },
    voteCountGT: { type: GraphQLInt },
    withGenres: { type: GraphQLString },
    withNetworks: { type: GraphQLString },
    withoutGenres: { type: GraphQLString },
    withRuntimeGT: { type: GraphQLInt },
    withRuntimeLT: { type: GraphQLInt },
    includeNullFirstAirDates: { defaultValue: false, type: GraphQLBoolean },
    withOriginalLanguage: { type: GraphQLString },
    withoutKeywords: { type: GraphQLString },
    screenedTheatrically: { type: GraphQLBoolean },
  }),
});
