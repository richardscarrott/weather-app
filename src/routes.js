import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app/App';
import Weather from './components/weather/Weather';
import NotFound from './components/notfound/Notfound';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Weather} />
        <Route path="*" component={NotFound} />
    </Route>
);

export { NotFound as NotFoundComponent };
