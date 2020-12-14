import React from 'react';

export interface AppState {
  props: AppProps;
  setProps(props: AppProps): void;
}

export type AppProps = {
  name: string;
};

export const propsDefault = {
  name: 'Restore+',
};

export const appDefaultState: AppState = {
  props: propsDefault,
  setProps: () => {},
};

export const AppContext = React.createContext<AppState>(appDefaultState);
