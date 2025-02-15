import React from 'react';

export const withStrict = (component: () => React.ReactNode) => () => (
  <React.StrictMode>{component()}</React.StrictMode>
);
