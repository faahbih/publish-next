import { State } from 'store';
import { View, ViewType } from 'containers/Types';

export const filter = (state: State, viewType: ViewType): View[] => {
  return state.views.filter((view: View) => view.type === viewType);
};

export const filterByName = (
  state: State,
  viewType: ViewType,
  name: string,
): View | undefined => {
  return state.views.find(
    (view: View) => view.type === viewType && view.name === name,
  );
};
