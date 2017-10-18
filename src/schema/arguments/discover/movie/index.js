import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLString } from 'graphql';
import SortByType, { DEFAULT_VALUE } from '../../../enum/sort-by/movie';

export default {
  region: { type: GraphQLString }, // NOTE: Needs custom scalar type
  sortBy: { defaultValue: DEFAULT_VALUE, type: SortByType },
  certificationCountry: { type: GraphQLString },
  certification: { type: GraphQLString },
  certificationLT: { type: GraphQLString },
  includeAdult: { defaultValue: false, type: GraphQLBoolean },
  includeVideo: { defaultValue: false, type: GraphQLBoolean },
  primaryReleaseYear: { type: GraphQLInt },
  primaryReleaseDateGT: { type: DateType }, // NOTE: Needs custom scalar type
  primaryReleaseDateLT: { type: DateType },
  releaseDateGT: { type: DateType },
  releaseDateLT: { type: DateType },
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
  withReleaseType: { type: GraphQLInt }, // NOTE: Needs custom scalar type
  withOriginalLanguage: { type: GraphQLString },
  withoutKeywords: { type: GraphQLString },
};
