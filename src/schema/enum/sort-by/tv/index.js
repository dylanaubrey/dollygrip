import { GraphQLEnumType } from 'graphql';

export const DEFAULT_VALUE = 'popularity.desc';

export default new GraphQLEnumType({
  name: 'SortBy',
  values: {
    POPULARITY_ASC: { value: 'popularity.asc' },
    POPULARITY_DESC: { value: DEFAULT_VALUE },
    VOTE_AVERAGE_ASC: { value: 'voteAverage.asc' },
    VOTE_AVERAGE_DESC: { value: 'voteAverage.desc' },
    FIRST_AIR_DATE_ASC: { value: 'firstAirDate.asc' },
    FIRST_AIR_DATE_DESC: { value: 'firstAirDate.desc' },
  },
});
