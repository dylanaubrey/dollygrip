export const BASE_PATH = "https://api.themoviedb.org/3/";

export const GET_METHOD = "get" as const;
export const POST_METHOD = "post" as const;
export const PUT_METHOD = "put" as const;
export const DELETE_METHOD = "delete" as const;

export const OPTIONAL_TYPE_PATH_TEMPLATE_REGEX = /({type\?})/g;

export const CERTIFICATIONS_PATH = "certification/{type}/list";
export const COLLECTION_PATH = "collection/{id}/{type?}";
export const COMPANY_PATH = "company/{id}/{type?}";
export const CONFIGURATION_PATH = "configuration/{type?}";
export const CREDIT_PATH = "credit/{id}";
export const DISCOVER_PATH = "discover/{type}";
export const FIND_PATH = "find/{id}";
export const GENRE_PATH = "genre/{type}/list";
export const KEYWORD_PATH = "keyword/{id}";
export const MOVIE_PATH = "movie/{id}/{type?}";
export const NETWORK_PATH = "network/{id}/{type?}";
export const PERSON_PATH = "person/{id}/{type?}";
export const POPULAR_PATH = "{type}/popular";
export const REVIEW_PATH = "review/{id}";
export const SEARCH_PATH = "search/{type}";
export const TRENDING_PATH = "trending/{type}/{subType}";
export const TV_PATH = "tv/{id}/{type?}";
