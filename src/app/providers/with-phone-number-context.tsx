import React from 'react';

interface CtxProps {
  phoneNumber: string | null;
  setPhoneNumber: (phoneNumber: string) => void;
}

export const PhoneNumberCtx = React.createContext<CtxProps | undefined>(
  undefined
);

export const usePhoneNumberCtx = () => {
  const context = React.useContext(PhoneNumberCtx);
  if (!context) {
    throw new Error(
      'PhoneNumberCtx must be used within a PhoneNumberCtxProvider'
    );
  }
  return context;
};

export const withPhoneNumberCtx = (
  Component: React.ComponentType
): React.FC => {
  return (props) => {
    const [phoneNumber, setPhoneNumber] = React.useState<string | null>(null);

    return (
      <PhoneNumberCtx.Provider value={{ phoneNumber, setPhoneNumber }}>
        <Component {...props} />
      </PhoneNumberCtx.Provider>
    );
  };
};
