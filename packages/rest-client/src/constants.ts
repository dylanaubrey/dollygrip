export const BASE_PATH = "https://api.themoviedb.org/3/";

export const GET_METHOD = "get" as const;
export const POST_METHOD = "post" as const;
export const PUT_METHOD = "put" as const;
export const DELETE_METHOD = "delete" as const;

export const OPTIONAL_TYPE_PATH_TEMPLATE_REGEX = /(\/{type\?})/g;
