import React from 'react';
import Helmet from 'react-helmet';

const DEFAULT_TITLE = 'Buildit';

function App({ children }) {
    return (
        <div>
            <Helmet titleTemplate={`%s | ${DEFAULT_TITLE}`} defaultTitle={DEFAULT_TITLE} />
            {children}
        </div>
    );
}

export default App;
