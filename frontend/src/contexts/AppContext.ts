import { Border } from 'containers/Types';
import React from 'react';

export type AppProps = {
  name: string;
  border: Border;
};

export interface AppState {
  props: AppProps;
  setProps(props: AppProps): void;
}

export const propsDefault: AppProps = {
  name: 'Restore+',
  border: {
    views: [],
  },
};

export const appDefaultState: AppState = {
  props: propsDefault,
  setProps: () => {},
};

export const AppContext = React.createContext<AppState>(appDefaultState);
