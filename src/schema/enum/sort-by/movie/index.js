import { GraphQLEnumType } from 'graphql';

export const DEFAULT_VALUE = 'popularity.desc';

export default new GraphQLEnumType({
  name: 'MovieSortBy',
  values: {
    POPULARITY_ASC: { value: 'popularity.asc' },
    POPULARITY_DESC: { value: DEFAULT_VALUE },
    RELEASE_DATE_ASC: { value: 'releaseDate.asc' },
    RELEASE_DATE_DESC: { value: 'releaseDate.desc' },
    REVENUE_ASC: { value: 'revenue.asc' },
    REVENUE_DESC: { value: 'revenue.desc' },
    ORIGINAL_TITLE_ASC: { value: 'originalTitle.asc' },
    ORIGINAL_TITLE_DESC: { value: 'originalTitle.desc' },
    VOTE_AVERAGE_ASC: { value: 'voteAverage.asc' },
    VOTE_AVERAGE_DESC: { value: 'voteAverage.desc' },
    VOTE_COUNT_ASC: { value: 'voteCount.asc' },
    VOTE_COUNT_DESC: { value: 'voteCount.desc' },
  },
});
