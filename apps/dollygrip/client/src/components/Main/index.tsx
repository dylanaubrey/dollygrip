import { Route, Switch } from 'react-router-dom';
import useConfig from '../../hooks/useConfig';
import Homepage from '../Homepage';

const Main = () => {
  const { routes } = useConfig();

  return (
    <div className="Main">
      <Switch>
        <Route exact path={routes.root} render={() => <Homepage />} />
        <Route path={routes.searchResults} render={() => <div>Search results...</div>} />
        <Route path="*">
          <div>Not found...</div>
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
