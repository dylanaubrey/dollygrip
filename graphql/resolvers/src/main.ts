import resolveCertifications from './certifications';
import resolveCollection from './collection';
import resolveCollectionImages from './collection-images';
import resolveCollectionTranslations from './collection-translations';

export default {
  Collection: {
    backdrops: resolveCollectionImages,
    posters: resolveCollectionImages,
    translations: resolveCollectionTranslations,
  },
  Query: {
    certifications: resolveCertifications,
    collection: resolveCollection,
    company: null,
    configuration: null,
    credit: null,
    discoverMovies: null,
    discoverTV: null,
    find: null,
    genres: null,
    keyword: null,
    movie: null,
    network: null,
    person: null,
    popular: null,
    review: null,
    search: null,
    trending: null,
    tv: null,
  },
};