import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import config from './config';
import Toolbelt from './contexts/Toolbelt';
import createGraphqlBoxClient from './modules/graphqlBoxClient';
import reportWebVitals from './reportWebVitals';

(async () => {
  const graphqlBoxClient = await createGraphqlBoxClient();

  ReactDOM.render(
    <React.StrictMode>
      <Toolbelt config={config} graphqlBoxClient={graphqlBoxClient}>
        <App />
      </Toolbelt>
    </React.StrictMode>,
    document.getElementById('root')
  );

  reportWebVitals(console.log); // eslint-disable-line no-console
})();
