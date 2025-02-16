import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = (Component: React.ComponentType): React.FC => {
  return (props) => (
    <BrowserRouter>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </React.Suspense>
    </BrowserRouter>
  );
};
