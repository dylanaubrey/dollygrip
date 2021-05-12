import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Main from './components/Main';

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
      <Router>
        <Header />
        <Main />
      </Router>
    </ErrorBoundary>
  </div>
);

export default App;
