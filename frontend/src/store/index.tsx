import { TimelineOption, View, ViewType } from 'containers/Types';
import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

// { [name: string]: any; } | null
export type State = {
  currentScenario: string;
  currentAttribute: string;
  currentBorder: string;
  currentBackground: string;
  currentYear: number;
  mapTooltipsEnabled: boolean;
  currentTimelineOption: TimelineOption;
  views: View[];
};

type Action =
  | { type: 'ADD_VIEW'; view: View }
  | { type: 'TOGGLE_VIEW'; viewType: ViewType; name: string; visible: boolean }
  | { type: 'SET_CURRENT_YEAR'; year: number }
  | { type: 'SET_TIMELINE_OPTION'; option: TimelineOption }
  | { type: 'SET_MAP_TOOLTIP'; enabled: boolean };

const initialState: State = {
  currentScenario: '',
  currentAttribute: '',
  currentBorder: '',
  currentBackground: '',
  currentYear: 2000,
  mapTooltipsEnabled: true,
  currentTimelineOption: TimelineOption.ABSOLUTE,
  views: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_VIEW':
      const newStateAddView = {
        ...state,
        views: [...state.views, action.view],
      };

      if (action.view.visible) {
        if (action.view.type === ViewType.SCENARIO) {
          newStateAddView.currentScenario = action.view.name;
        }

        if (action.view.type === ViewType.ATTRIBUTE) {
          newStateAddView.currentAttribute = action.view.name;
        }

        if (action.view.type === ViewType.BORDER) {
          newStateAddView.currentBorder = action.view.name;
        }

        if (action.view.type === ViewType.BACKGROUND) {
          newStateAddView.currentBackground = action.view.name;
        }
      }

      return newStateAddView;
    case 'TOGGLE_VIEW':
      const resetViews = state.views.map((view) => {
        if (view.type === action.viewType) {
          return { ...view, visible: false };
        }

        return { ...view };
      });

      const newViews = resetViews.map((view) => {
        if (view.type === action.viewType && view.name === action.name) {
          return { ...view, visible: action.visible };
        }

        return { ...view };
      });

      const newState = { ...state };
      const viewActive = newViews.find(
        (view) => view.type === action.viewType && view.visible,
      );
      if (viewActive) {
        if (viewActive.type === ViewType.SCENARIO) {
          newState.currentScenario = viewActive.name;
        }

        if (viewActive.type === ViewType.ATTRIBUTE) {
          newState.currentAttribute = viewActive.name;
        }

        if (viewActive.type === ViewType.BORDER) {
          newState.currentBorder = viewActive.name;
          newState.mapTooltipsEnabled =
            viewActive.visible && viewActive.data !== undefined;
        }

        if (viewActive.type === ViewType.BACKGROUND) {
          newState.currentBackground = viewActive.name;
        }

        newState.views = newViews;
      }

      return newState;
    case 'SET_CURRENT_YEAR':
      return {
        ...state,
        currentYear: action.year,
      };
    case 'SET_TIMELINE_OPTION':
      return {
        ...state,
        currentTimelineOption: action.option,
      };
    case 'SET_MAP_TOOLTIP':
      return {
        ...state,
        mapTooltipsEnabled: action.enabled,
      };
    default:
      return state;
  }
};

const useValue = () => useReducer(reducer, initialState);

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue);
