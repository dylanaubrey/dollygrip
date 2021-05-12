import { Route, Switch } from 'react-router-dom';
import useConfig from '../../hooks/useConfig';
import SearchResults from '../SearchResults';

const Main = () => {
  const { routes } = useConfig();

  return (
    <div className="Main">
      <Switch>
        <Route exact path={routes.root} render={() => <div>Welcome...</div>} />
        <Route path={routes.searchResults} render={({ location }) => <SearchResults location={location} />} />
        <Route path="*" render={() => <div>Not found...</div>} />
      </Switch>
    </div>
  );
};

export default Main;
