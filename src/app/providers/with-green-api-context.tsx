import React from 'react';
import { GreenApiClient } from '@/shared/api/green-api/green-api-client';

interface CtxProps {
  greenApiClient: GreenApiClient | null;
  setGreenApiClient: (client: GreenApiClient) => void;
}

export const GreenApiClientCtx = React.createContext<CtxProps | undefined>(
  undefined
);

export const useGreenApiCtx = () => {
  const context = React.useContext(GreenApiClientCtx);
  if (!context) {
    throw new Error('GreenApiCtx must be used within a GreenApiCtxProvider');
  }
  return context;
};

export const withGreenApiClientCtx = (
  Component: React.ComponentType
): React.FC => {
  return (props) => {
    const [greenApiClient, setGreenApiClient] =
      React.useState<GreenApiClient | null>(null);

    return (
      <GreenApiClientCtx.Provider value={{ greenApiClient, setGreenApiClient }}>
        <Component {...props} />
      </GreenApiClientCtx.Provider>
    );
  };
};
