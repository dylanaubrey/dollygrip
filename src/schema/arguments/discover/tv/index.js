import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLString } from 'graphql';
import SortByType, { DEFAULT_VALUE } from '../../../enum/sort-by/tv';

export default {
  sortBy: { defaultValue: DEFAULT_VALUE, type: SortByType },
  primaryReleaseYear: { type: GraphQLInt },
  airDateGT: { type: DateType }, // NOTE: Needs custom scalar type
  airDateLT: { type: DateType },
  firstAirDateGT: { type: DateType },
  firstAirDateLT: { type: DateType },
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
};
