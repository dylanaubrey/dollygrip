import { CssBaseline } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Main from './components/Main';
import config from './config';
import Toolbelt from './contexts/Toolbelt';

const history = createBrowserHistory();

const App = () => (
  <div className="App">
    <CssBaseline />
    <ErrorBoundary
      onError={(_error, _errorInfo) => {
        // LOGGER
      }}
      renderError={() => (
        // ERROR COMPONENT
        <div />
      )}
    >
      <Toolbelt config={config}>
        <Router history={history}>
          <Header />
          <Main />
        </Router>
      </Toolbelt>
    </ErrorBoundary>
  </div>
);

export default App;
