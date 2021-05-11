import { Route, Switch } from 'react-router-dom';
import useConfig from '../../hooks/useConfig';

const Main = () => {
  const { routes } = useConfig();

  return (
    <div className="Main">
      <Switch>
        <Route path={routes.searchResults} render={() => <div>Search results...</div>} />
      </Switch>
    </div>
  );
};

export default Main;
