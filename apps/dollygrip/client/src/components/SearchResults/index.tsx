import type { Location } from 'history';
import preval from 'preval.macro';
import { useEffect } from 'react';
import useQuery from '../../hooks/useQuery';

export type Props = {
  location: Location<{ keyphrase?: string }>;
};

const GET_SEARCH_RESULTS = preval`
  const fs = require('fs');
  const path = require('path');
  module.exports = fs.readFileSync(path.resolve(__dirname, 'GetSearchResults.graphql'), 'utf8');
` as string;

const SearchResults = ({ location }: Props) => {
  const [executeQuery, loading, errors, data] = useQuery(GET_SEARCH_RESULTS);

  useEffect(() => {
    executeQuery({ variables: { query: location.state.keyphrase } });
  }, [location.state.keyphrase]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <div>Loading search results...</div>;
  }

  if (data && !errors) {
    return <div>Data returned...</div>;
  }

  return <div>Errors returned...</div>;
};

export default SearchResults;
