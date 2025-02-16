import React from 'react';

export const withStrict = (Component: React.ComponentType): React.FC => {
  return (props) => (
    <React.StrictMode>
      <Component {...props} />
    </React.StrictMode>
  );
};
