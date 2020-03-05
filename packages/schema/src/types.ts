export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  Boolean: boolean;
  Date: Date;
  Float: number;
  ID: number;
  Int: number;
  String: string;
};

export type AlternativeName = {
  __typename?: "AlternativeName";
  iso31661?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  type: Scalars["String"];
};

export type Cast = Node & {
  __typename?: "Cast";
  castId: Scalars["ID"];
  character: Scalars["String"];
  creditId: Scalars["ID"];
  gender?: Maybe<Scalars["Int"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  order: Scalars["Int"];
  profilePath?: Maybe<Scalars["String"]>;
};

export type CastCombinedCredit = Node & {
  __typename?: "CastCombinedCredit";
  adult: Scalars["Boolean"];
  backdropPath?: Maybe<Scalars["String"]>;
  character: Scalars["String"];
  creditId: Scalars["ID"];
  episodeCount: Scalars["Int"];
  firstAirDate: Scalars["Date"];
  genreIds: Maybe<Scalars["ID"]>[];
  id: Scalars["ID"];
  mediaType: ScreenType;
  name: Scalars["String"];
  originalLanguage: Scalars["String"];
  originalName: Scalars["String"];
  originalTitle: Scalars["String"];
  originCountry: Maybe<Scalars["String"]>[];
  overview: Scalars["String"];
  popularity: Scalars["Int"];
  posterPath?: Maybe<Scalars["String"]>;
  releaseDate: Scalars["Date"];
  title: Scalars["String"];
  video: Scalars["Boolean"];
  voteAverage: Scalars["Float"];
  voteCount: Scalars["Int"];
};

export type CastMovieCredit = Node & {
  __typename?: "CastMovieCredit";
  adult: Scalars["Boolean"];
  backdropPath?: Maybe<Scalars["String"]>;
  character: Scalars["String"];
  creditId: Scalars["ID"];
  genreIds: Maybe<Scalars["ID"]>[];
  id: Scalars["ID"];
  originalLanguage: Scalars["String"];
  originalTitle: Scalars["String"];
  overview: Scalars["String"];
  popularity: Scalars["Int"];
  posterPath?: Maybe<Scalars["String"]>;
  releaseDate: Scalars["Date"];
  title: Scalars["String"];
  video: Scalars["Boolean"];
  voteAverage: Scalars["Float"];
  voteCount: Scalars["Int"];
};

export type CastTvCredit = Node & {
  __typename?: "CastTVCredit";
  backdropPath?: Maybe<Scalars["String"]>;
  character: Scalars["String"];
  creditId: Scalars["ID"];
  episodeCount: Scalars["Int"];
  firstAirDate: Scalars["Date"];
  genreIds: Maybe<Scalars["ID"]>[];
  id: Scalars["ID"];
  name: Scalars["String"];
  originalLanguage: Scalars["String"];
  originalName: Scalars["String"];
  originCountry: Maybe<Scalars["String"]>[];
  overview: Scalars["String"];
  popularity: Scalars["Int"];
  posterPath?: Maybe<Scalars["String"]>;
  voteAverage: Scalars["Float"];
  voteCount: Scalars["Int"];
};

export type Certification = {
  __typename?: "Certification";
  certification: Scalars["String"];
  meaning: Scalars["String"];
  order: Scalars["Int"];
};

export type Certifications = {
  __typename?: "Certifications";
  AU?: Maybe<Certification>;
  BR?: Maybe<Certification>;
  CA?: Maybe<Certification>;
  CA_QC?: Maybe<Certification>;
  DE?: Maybe<Certification>;
  FR?: Maybe<Certification>;
  GB?: Maybe<Certification>;
  IN?: Maybe<Certification>;
  KR?: Maybe<Certification>;
  NL?: Maybe<Certification>;
  NZ?: Maybe<Certification>;
  PT?: Maybe<Certification>;
  RU?: Maybe<Certification>;
  SK?: Maybe<Certification>;
  TH?: Maybe<Certification>;
  US?: Maybe<Certification>;
};

export type Collection = Node & {
  __typename?: "Collection";
  backdropPath?: Maybe<Scalars["String"]>;
  backdrops?: Maybe<Maybe<Image>[]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  overview: Scalars["String"];
  parts: Maybe<Movie>[];
  posterPath?: Maybe<Scalars["String"]>;
  posters?: Maybe<Maybe<Image>[]>;
  translations?: Maybe<Maybe<Translation>[]>;
};

export type CombinedCredits = {
  __typename?: "CombinedCredits";
  cast?: Maybe<Maybe<CastCombinedCredit>[]>;
  crew?: Maybe<Maybe<CrewCombinedCredit>[]>;
};

export type Company = Node & {
  __typename?: "Company";
  alternativeNames?: Maybe<Maybe<AlternativeName>[]>;
  description: Scalars["String"];
  headquarters: Scalars["String"];
  homepage: Scalars["String"];
  id: Scalars["ID"];
  logoPath: Scalars["String"];
  logos?: Maybe<Maybe<Image>[]>;
  name: Scalars["String"];
  originCountry?: Maybe<Scalars["String"]>;
  parentCompany?: Maybe<Scalars["String"]>;
};

export type Configuration = {
  __typename?: "Configuration";
  changeKeys?: Maybe<Maybe<Scalars["String"]>[]>;
  countries?: Maybe<Maybe<Country>[]>;
  images: ImagesConfiguration;
  jobs?: Maybe<Maybe<JobsConfiguration>[]>;
  languages?: Maybe<Maybe<Language>[]>;
  primaryTranslations?: Maybe<Maybe<Scalars["String"]>[]>;
  timezones?: Maybe<Maybe<Timezone>[]>;
};

export type Connection = {
  pageInfo: PageInfo;
};

export type ConnectionInput = {
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type ContentRating = {
  __typename?: "ContentRating";
  iso31661: Scalars["String"];
  rating: Scalars["String"];
};

export type Country = {
  __typename?: "Country";
  englishName?: Maybe<Scalars["String"]>;
  iso31661: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
};

export type Credit = Node & {
  __typename?: "Credit";
  creditType: Scalars["String"];
  department: Scalars["String"];
  id: Scalars["ID"];
  job: Scalars["String"];
  media: Screen;
  mediaType: ScreenType;
  person: Person;
};

export type Crew = Node & {
  __typename?: "Crew";
  creditId: Scalars["ID"];
  department: Scalars["String"];
  gender?: Maybe<Scalars["Int"]>;
  id: Scalars["ID"];
  job: Scalars["String"];
  name: Scalars["String"];
  profilePath?: Maybe<Scalars["String"]>;
};

export type CrewCombinedCredit = Node & {
  __typename?: "CrewCombinedCredit";
  adult: Scalars["Boolean"];
  backdropPath?: Maybe<Scalars["String"]>;
  creditId: Scalars["ID"];
  department: Scalars["String"];
  episodeCount: Scalars["Int"];
  firstAirDate: Scalars["Date"];
  genreIds: Maybe<Scalars["ID"]>[];
  id: Scalars["ID"];
  job: Scalars["String"];
  mediaType: ScreenType;
  name: Scalars["String"];
  originalLanguage: Scalars["String"];
  originalName: Scalars["String"];
  originalTitle: Scalars["String"];
  originCountry: Maybe<Scalars["String"]>[];
  overview: Scalars["String"];
  popularity: Scalars["Int"];
  posterPath?: Maybe<Scalars["String"]>;
  releaseDate: Scalars["Date"];
  title: Scalars["String"];
  video: Scalars["Boolean"];
  voteAverage: Scalars["Float"];
  voteCount: Scalars["Int"];
};

export type CrewMovieCredit = Node & {
  __typename?: "CrewMovieCredit";
  adult: Scalars["Boolean"];
  backdropPath?: Maybe<Scalars["String"]>;
  creditId: Scalars["ID"];
  department: Scalars["String"];
  genreIds: Maybe<Scalars["ID"]>[];
  id: Scalars["ID"];
  job: Scalars["String"];
  originalLanguage: Scalars["String"];
  originalTitle: Scalars["String"];
  overview: Scalars["String"];
  popularity: Scalars["Int"];
  posterPath?: Maybe<Scalars["String"]>;
  releaseDate: Scalars["Date"];
  title: Scalars["String"];
  video: Scalars["Boolean"];
  voteAverage: Scalars["Float"];
  voteCount: Scalars["Int"];
};

export type CrewTvCredit = Node & {
  __typename?: "CrewTVCredit";
  backdropPath?: Maybe<Scalars["String"]>;
  creditId: Scalars["ID"];
  department: Scalars["String"];
  episodeCount: Scalars["Int"];
  firstAirDate: Scalars["Date"];
  genreIds: Maybe<Scalars["ID"]>[];
  id: Scalars["ID"];
  job: Scalars["String"];
  name: Scalars["String"];
  originalLanguage: Scalars["String"];
  originalName: Scalars["String"];
  originCountry: Maybe<Scalars["String"]>[];
  overview: Scalars["String"];
  popularity: Scalars["Int"];
  posterPath?: Maybe<Scalars["String"]>;
  voteAverage: Scalars["Float"];
  voteCount: Scalars["Int"];
};

export type DiscoverMovieConnectionInput = {
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  certification?: Maybe<Scalars["String"]>;
  certificationCountry?: Maybe<Scalars["String"]>;
  certificationGreaterThan?: Maybe<Scalars["String"]>;
  certificationLessThan?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  includeAdult?: Maybe<Scalars["Boolean"]>;
  includeVideo?: Maybe<Scalars["Boolean"]>;
  last?: Maybe<Scalars["Int"]>;
  primaryReleaseDateGeaterThan?: Maybe<Scalars["Date"]>;
  primaryReleaseDateLessThan?: Maybe<Scalars["Date"]>;
  primaryReleaseYear?: Maybe<Scalars["Int"]>;
  releaseDateGeaterThan?: Maybe<Scalars["Date"]>;
  releaseDateLessThan?: Maybe<Scalars["Date"]>;
  sortBy?: Maybe<SortBy>;
  voteAverageGreaterThan?: Maybe<Scalars["Int"]>;
  voteAverageLessThan?: Maybe<Scalars["Int"]>;
  voteCountGreaterThan?: Maybe<Scalars["Int"]>;
  voteCountLessThan?: Maybe<Scalars["Int"]>;
  withCast?: Maybe<Scalars["String"]>;
  withCompanies?: Maybe<Scalars["String"]>;
  withCrew?: Maybe<Scalars["String"]>;
  withGenres?: Maybe<Scalars["String"]>;
  withKeywords?: Maybe<Scalars["String"]>;
  withOriginalLanguage?: Maybe<Scalars["String"]>;
  withoutGenres?: Maybe<Scalars["String"]>;
  withoutKeywords?: Maybe<Scalars["String"]>;
  withPeople?: Maybe<Scalars["String"]>;
  withReleaseType?: Maybe<Scalars["Int"]>;
  withRuntimeGreaterThan?: Maybe<Scalars["Int"]>;
  withRuntimeLessThan?: Maybe<Scalars["Int"]>;
  year?: Maybe<Scalars["Int"]>;
};

export type DiscoverTvConnectionInput = {
  after?: Maybe<Scalars["String"]>;
  airDateGreaterThan?: Maybe<Scalars["Date"]>;
  airDateLessThan?: Maybe<Scalars["Date"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  firstAirDateGreaterThan?: Maybe<Scalars["Date"]>;
  firstAirDateLessThan?: Maybe<Scalars["Date"]>;
  firstAirDateYear?: Maybe<Scalars["Int"]>;
  includeNullFirstAirDates?: Maybe<Scalars["Boolean"]>;
  last?: Maybe<Scalars["Int"]>;
  screenedTheatrically?: Maybe<Scalars["Boolean"]>;
  sortBy?: Maybe<SortBy>;
  timezone?: Maybe<Scalars["String"]>;
  voteAverageGreaterThan?: Maybe<Scalars["Int"]>;
  voteCountGreaterThan?: Maybe<Scalars["Int"]>;
  withCompanies?: Maybe<Scalars["String"]>;
  withGenres?: Maybe<Scalars["String"]>;
  withKeywords?: Maybe<Scalars["String"]>;
  withNetworks?: Maybe<Scalars["String"]>;
  withOriginalLanguage?: Maybe<Scalars["String"]>;
  withoutGenres?: Maybe<Scalars["String"]>;
  withoutKeywords?: Maybe<Scalars["String"]>;
  withRuntimeGreaterThan?: Maybe<Scalars["Int"]>;
  withRuntimeLessThan?: Maybe<Scalars["Int"]>;
};

export type Episode = Node & {
  __typename?: "Episode";
  airDate: Scalars["Date"];
  episodeNumber: Scalars["Int"];
  id: Scalars["ID"];
  name: Scalars["String"];
  overview: Scalars["String"];
  productionCode: Scalars["String"];
  seasonNumber: Scalars["Int"];
  showId: Scalars["ID"];
  stillPath: Scalars["String"];
  voteAverage: Scalars["Float"];
  voteCount: Scalars["Int"];
};

export type EpisodeGroup = Node & {
  __typename?: "EpisodeGroup";
  description: Scalars["String"];
  episodeCount: Scalars["Int"];
  groupCount: Scalars["Int"];
  id: Scalars["ID"];
  name: Scalars["String"];
  network: Company;
  type: Scalars["String"];
};

export type ExternalIds = {
  __typename?: "ExternalIds";
  facebookId?: Maybe<Scalars["String"]>;
  freebaseId?: Maybe<Scalars["String"]>;
  freebaseMid?: Maybe<Scalars["String"]>;
  imdbId?: Maybe<Scalars["String"]>;
  instagramId?: Maybe<Scalars["String"]>;
  tvdbId?: Maybe<Scalars["String"]>;
  tvrageId?: Maybe<Scalars["String"]>;
  twitterId?: Maybe<Scalars["String"]>;
};

export enum ExternalSource {
  ImdbId = "IMDB_ID",
  FreebaseMid = "FREEBASE_MID",
  FreebaseId = "FREEBASE_ID",
  TvdbId = "TVDB_ID",
  TvrageId = "TVRAGE_ID",
  FacebookId = "FACEBOOK_ID",
  TwitterId = "TWITTER_ID",
  InstagramId = "INSTAGRAM_ID",
}

export type FindResults = {
  __typename?: "FindResults";
  movies?: Maybe<Maybe<Movie>[]>;
  people?: Maybe<Maybe<Person>[]>;
  tv?: Maybe<Maybe<Tv>[]>;
};

export type Genre = Node & {
  __typename?: "Genre";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Image = {
  __typename?: "Image";
  aspectRadio: Scalars["Float"];
  filePath: Scalars["String"];
  fileType?: Maybe<Scalars["String"]>;
  height: Scalars["Int"];
  iso6391: Scalars["Float"];
  voteAverage: Scalars["Int"];
  voteCount: Scalars["Int"];
  width: Scalars["Int"];
};

export type ImagesConfiguration = {
  __typename?: "ImagesConfiguration";
  backdropSizes: Maybe<Scalars["String"]>[];
  baseUrl: Scalars["String"];
  logoSizes: Maybe<Scalars["String"]>[];
  posterSizes: Maybe<Scalars["String"]>[];
  profileSizes: Maybe<Scalars["String"]>[];
  secureBaseUrl: Scalars["String"];
  stillSizes: Maybe<Scalars["String"]>[];
};

export type JobsConfiguration = {
  __typename?: "JobsConfiguration";
  department: Scalars["String"];
  jobs: Maybe<Scalars["String"]>[];
};

export type Keyword = {
  __typename?: "Keyword";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Language = {
  __typename?: "Language";
  englishName?: Maybe<Scalars["String"]>;
  iso6391: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
};

export type Media = Movie | Tv | Person;

export type MediaConnection = Connection & {
  __typename?: "MediaConnection";
  edges?: Maybe<Maybe<MediaEdge>[]>;
  pageInfo: PageInfo;
  totalResults: Scalars["Int"];
};

export type MediaEdge = {
  __typename?: "MediaEdge";
  cursor: Scalars["String"];
  node?: Maybe<Media>;
};

export enum MediaType {
  Movie = "MOVIE",
  Tv = "TV",
  Person = "PERSON",
}

export type Movie = Node & {
  __typename?: "Movie";
  adult: Scalars["Boolean"];
  alternativeTitles?: Maybe<Maybe<AlternativeName>[]>;
  backdropPath?: Maybe<Scalars["String"]>;
  backdrops?: Maybe<Maybe<Image>[]>;
  belongsToCollection?: Maybe<Collection>;
  budget: Scalars["Int"];
  cast?: Maybe<Maybe<Cast>[]>;
  crew?: Maybe<Maybe<Crew>[]>;
  externalIds?: Maybe<ExternalIds>;
  genres: Maybe<Genre>[];
  homepage?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  imdbId?: Maybe<Scalars["String"]>;
  keywords?: Maybe<Maybe<Keyword>[]>;
  mediaType?: Maybe<MediaType>;
  originalLanguage: Scalars["String"];
  originalTitle: Scalars["String"];
  overview?: Maybe<Scalars["String"]>;
  popularity: Scalars["Float"];
  posterPath?: Maybe<Scalars["String"]>;
  posters?: Maybe<Maybe<Image>[]>;
  productionCompanies: Maybe<Company>[];
  productionCountries: Maybe<Country>[];
  recommendations?: Maybe<MovieConnection>;
  releaseDate: Scalars["Date"];
  releaseDates?: Maybe<Maybe<ReleaseDates>[]>;
  revenue: Scalars["Int"];
  reviews?: Maybe<ReviewConnection>;
  runtime?: Maybe<Scalars["Int"]>;
  similarMovies?: Maybe<MovieConnection>;
  spokenLanguages: Maybe<Language>[];
  status: Scalars["String"];
  tagline?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  translations?: Maybe<Maybe<Translation>[]>;
  video: Scalars["Boolean"];
  videos?: Maybe<Maybe<Video>[]>;
  voteAverage: Scalars["Float"];
  voteCount: Scalars["Int"];
};

export type MovieRecommendationsArgs = {
  args?: Maybe<ConnectionInput>;
};

export type MovieReviewsArgs = {
  args?: Maybe<ConnectionInput>;
};

export type MovieSimilarMoviesArgs = {
  args?: Maybe<ConnectionInput>;
};

export type MovieConnection = Connection & {
  __typename?: "MovieConnection";
  edges?: Maybe<Maybe<MovieEdge>[]>;
  pageInfo: PageInfo;
  totalResults: Scalars["Int"];
};

export type MovieCredits = {
  __typename?: "MovieCredits";
  cast?: Maybe<Maybe<CastMovieCredit>[]>;
  crew?: Maybe<Maybe<CrewMovieCredit>[]>;
};

export type MovieEdge = {
  __typename?: "MovieEdge";
  cursor: Scalars["String"];
  node?: Maybe<Movie>;
};

export type Node = {
  id: Scalars["ID"];
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]>;
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
};

export type Person = Node & {
  __typename?: "Person";
  adult: Scalars["Boolean"];
  alsoKnownAs: Maybe<Scalars["String"]>[];
  biography: Scalars["String"];
  birthday?: Maybe<Scalars["String"]>;
  combinedCredits?: Maybe<CombinedCredits>;
  deathday?: Maybe<Scalars["String"]>;
  externalIds?: Maybe<ExternalIds>;
  gender: Scalars["Int"];
  homepage?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  imdbId: Scalars["String"];
  knownFor?: Maybe<Screen>;
  mediaType?: Maybe<MediaType>;
  movieCredits?: Maybe<MovieCredits>;
  name: Scalars["String"];
  placeOfBirth?: Maybe<Scalars["String"]>;
  popularity: Scalars["Float"];
  profilePath?: Maybe<Scalars["String"]>;
  profiles?: Maybe<Maybe<Image>[]>;
  translations?: Maybe<Maybe<Translation>[]>;
  tvCredits?: Maybe<TvCredits>;
};

export type PopularConnectionInput = {
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  mediaType?: Maybe<MediaType>;
};

export type Query = {
  __typename?: "Query";
  certifications?: Maybe<Certifications>;
  collection?: Maybe<Collection>;
  company?: Maybe<Company>;
  configuration?: Maybe<Configuration>;
  credit?: Maybe<Credit>;
  discoverMovies?: Maybe<MovieConnection>;
  discoverTV?: Maybe<TvConnection>;
  find?: Maybe<FindResults>;
  genres?: Maybe<Maybe<Genre>[]>;
  keyword?: Maybe<Keyword>;
  movie?: Maybe<Movie>;
  network?: Maybe<Company>;
  person?: Maybe<Person>;
  popular?: Maybe<MediaConnection>;
  review?: Maybe<Review>;
  search?: Maybe<SearchConnection>;
  trending?: Maybe<MediaConnection>;
  tv?: Maybe<Tv>;
};

export type QueryCertificationsArgs = {
  screenType: ScreenType;
};

export type QueryCollectionArgs = {
  id: Scalars["ID"];
};

export type QueryCompanyArgs = {
  id: Scalars["ID"];
};

export type QueryCreditArgs = {
  id: Scalars["ID"];
};

export type QueryDiscoverMoviesArgs = {
  input: DiscoverMovieConnectionInput;
};

export type QueryDiscoverTvArgs = {
  input: DiscoverTvConnectionInput;
};

export type QueryFindArgs = {
  id: Scalars["String"];
  source: ExternalSource;
};

export type QueryGenresArgs = {
  screenType: ScreenType;
};

export type QueryKeywordArgs = {
  id: Scalars["ID"];
};

export type QueryMovieArgs = {
  id: Scalars["ID"];
};

export type QueryNetworkArgs = {
  id: Scalars["ID"];
};

export type QueryPersonArgs = {
  id: Scalars["ID"];
};

export type QueryPopularArgs = {
  input?: Maybe<PopularConnectionInput>;
};

export type QueryReviewArgs = {
  id: Scalars["ID"];
};

export type QuerySearchArgs = {
  input?: Maybe<SearchConnectionInput>;
};

export type QueryTrendingArgs = {
  input: TrendingConnectionInput;
};

export type QueryTvArgs = {
  id: Scalars["ID"];
};

export type ReleaseDate = {
  __typename?: "ReleaseDate";
  certification: Scalars["String"];
  iso6391: Scalars["String"];
  note: Scalars["String"];
  releaseDate: Scalars["Date"];
  type: Scalars["Int"];
};

export type ReleaseDates = {
  __typename?: "ReleaseDates";
  iso31661: Scalars["String"];
  releaseDates: Maybe<ReleaseDate>[];
};

export type Review = Node & {
  __typename?: "Review";
  author: Scalars["String"];
  content: Scalars["String"];
  id: Scalars["ID"];
  iso6391?: Maybe<Scalars["String"]>;
  mediaTitle?: Maybe<Scalars["String"]>;
  mediaType?: Maybe<ScreenType>;
  url: Scalars["String"];
};

export type ReviewConnection = Connection & {
  __typename?: "ReviewConnection";
  edges?: Maybe<Maybe<ReviewEdge>[]>;
  pageInfo: PageInfo;
  totalResults: Scalars["Int"];
};

export type ReviewEdge = {
  __typename?: "ReviewEdge";
  cursor: Scalars["String"];
  node?: Maybe<Review>;
};

export type Screen = Movie | Tv;

export enum ScreenType {
  Movie = "MOVIE",
  Tv = "TV",
}

export type SearchConnection = Connection & {
  __typename?: "SearchConnection";
  edges?: Maybe<Maybe<SearchEdge>[]>;
  pageInfo: PageInfo;
  totalResults: Scalars["Int"];
};

export type SearchConnectionInput = {
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  firstAirDateYear?: Maybe<Scalars["Int"]>;
  includeAdult?: Maybe<Scalars["Boolean"]>;
  last?: Maybe<Scalars["Int"]>;
  primaryReleaseYear?: Maybe<Scalars["Int"]>;
  query: Scalars["String"];
  searchType?: Maybe<SearchType>;
  year?: Maybe<Scalars["Int"]>;
};

export type SearchEdge = {
  __typename?: "SearchEdge";
  cursor: Scalars["String"];
  node?: Maybe<SearchEntity>;
};

export type SearchEntity = Movie | Tv | Person | Company | Collection | Keyword;

export enum SearchType {
  Collection = "COLLECTION",
  Company = "COMPANY",
  Keyword = "KEYWORD",
  Movie = "MOVIE",
  Multi = "MULTI",
  Tv = "TV",
  Person = "PERSON",
}

export type Season = Node & {
  __typename?: "Season";
  airDate: Scalars["Date"];
  episodeCount: Scalars["Int"];
  id: Scalars["ID"];
  name: Scalars["String"];
  overview: Scalars["String"];
  posterPath?: Maybe<Scalars["String"]>;
  seasonNumber: Scalars["Int"];
};

export enum SortBy {
  PopularityAsc = "POPULARITY_ASC",
  PopularityDesc = "POPULARITY_DESC",
  ReleaseDateAsc = "RELEASE_DATE_ASC",
  ReleaseDateDesc = "RELEASE_DATE_DESC",
  RevenueAsc = "REVENUE_ASC",
  RevenueDesc = "REVENUE_DESC",
  PrimaryReleaseDateAsc = "PRIMARY_RELEASE_DATE_ASC",
  PrimaryReleaseDateDesc = "PRIMARY_RELEASE_DATE_DESC",
  OriginalTitleAsc = "ORIGINAL_TITLE_ASC",
  OriginalTitleDesc = "ORIGINAL_TITLE_DESC",
  VoteAverageAsc = "VOTE_AVERAGE_ASC",
  VoteAverageDesc = "VOTE_AVERAGE_DESC",
  VoteCountAsc = "VOTE_COUNT_ASC",
  VoteCountDesc = "VOTE_COUNT_DESC",
}

export type Timezone = {
  __typename?: "Timezone";
  iso31661: Scalars["String"];
  zones: Maybe<Scalars["String"]>[];
};

export type Translation = {
  __typename?: "Translation";
  data: TranslationData;
  englishName: Scalars["String"];
  iso31661: Scalars["String"];
  iso6391: Scalars["String"];
  name: Scalars["String"];
};

export type TranslationData = {
  __typename?: "TranslationData";
  biography?: Maybe<Scalars["String"]>;
  homepage?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  overview?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
};

export type TrendingConnectionInput = {
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  mediaType: TrendingMediaType;
  timeWindow: TrendingTimeWindow;
};

export enum TrendingMediaType {
  All = "ALL",
  Movie = "MOVIE",
  Tv = "TV",
  Person = "PERSON",
}

export enum TrendingTimeWindow {
  Day = "DAY",
  Week = "WEEK",
}

export type Tv = Node & {
  __typename?: "TV";
  alternativeTitles?: Maybe<Maybe<AlternativeName>[]>;
  backdropPath?: Maybe<Scalars["String"]>;
  backdrops?: Maybe<Maybe<Image>[]>;
  cast?: Maybe<Maybe<Cast>[]>;
  contentRatings?: Maybe<Maybe<ContentRating>[]>;
  createdBy?: Maybe<Person>;
  crew?: Maybe<Maybe<Crew>[]>;
  episodeGroups?: Maybe<Maybe<EpisodeGroup>[]>;
  episodeRunTime: Maybe<Scalars["Int"]>[];
  externalIds?: Maybe<ExternalIds>;
  firstAirDate: Scalars["Date"];
  genres?: Maybe<Maybe<Genre>[]>;
  homepage: Scalars["String"];
  id: Scalars["ID"];
  inProduction: Scalars["Boolean"];
  keywords?: Maybe<Maybe<Keyword>[]>;
  languages: Maybe<Scalars["String"]>[];
  lastAirDate: Scalars["Date"];
  lastEpisodeToAir: Episode;
  mediaType?: Maybe<MediaType>;
  name: Scalars["String"];
  networks: Maybe<Company>[];
  nextEpisodeToAir?: Maybe<Episode>;
  numberOfEpisodes: Scalars["Int"];
  numberOfSeasons: Scalars["Int"];
  originalLanguage: Scalars["String"];
  originalName: Scalars["String"];
  originCountry: Maybe<Scalars["String"]>[];
  overview: Scalars["String"];
  popularity: Scalars["Float"];
  posterPath?: Maybe<Scalars["String"]>;
  posters?: Maybe<Maybe<Image>[]>;
  productionCompanies: Maybe<Company>[];
  recommendations?: Maybe<TvConnection>;
  reviews?: Maybe<ReviewConnection>;
  seasons: Maybe<Season>[];
  similarTVShows?: Maybe<TvConnection>;
  status: Scalars["String"];
  translations?: Maybe<Maybe<Translation>[]>;
  type: Scalars["String"];
  videos?: Maybe<Maybe<Video>[]>;
  voteAverage: Scalars["Float"];
  voteCount: Scalars["Int"];
};

export type TvRecommendationsArgs = {
  args?: Maybe<ConnectionInput>;
};

export type TvReviewsArgs = {
  args?: Maybe<ConnectionInput>;
};

export type TvSimilarTvShowsArgs = {
  args?: Maybe<ConnectionInput>;
};

export type TvConnection = Connection & {
  __typename?: "TVConnection";
  edges?: Maybe<Maybe<TvEdge>[]>;
  pageInfo: PageInfo;
  totalResults: Scalars["Int"];
};

export type TvCredits = {
  __typename?: "TVCredits";
  cast?: Maybe<Maybe<CastTvCredit>[]>;
  crew?: Maybe<Maybe<CrewTvCredit>[]>;
};

export type TvEdge = {
  __typename?: "TVEdge";
  cursor: Scalars["String"];
  node?: Maybe<Tv>;
};

export type Video = Node & {
  __typename?: "Video";
  id: Scalars["ID"];
  iso31661: Scalars["String"];
  iso6391: Scalars["String"];
  key: Scalars["String"];
  name: Scalars["String"];
  site: Scalars["String"];
  size: Scalars["Int"];
  type: VideoType;
};

export enum VideoType {
  Trailer = "TRAILER",
  Teaser = "TEASER",
  Clip = "CLIP",
  Featurette = "FEATURETTE",
  BehindTheScenes = "BEHIND_THE_SCENES",
  Bloopers = "BLOOPERS",
  Optional = "OPTIONAL",
}
