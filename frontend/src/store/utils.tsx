import { State } from 'store';
import { View, ViewType } from 'containers/Types';

export const filter = (state: State, viewType: ViewType): View[] => {
  return state.views.filter((view: View) => view.type === viewType);
};
