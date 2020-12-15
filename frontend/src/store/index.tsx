import { View } from 'containers/Types';
import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

type State = {
  border: View[];
};

type Action =
  | { type: 'ADD_BORDER'; view: View }
  | { type: 'TOGGLE_BORDER'; name: string; visible: boolean };

const initialState: State = {
  border: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_BORDER':
      return {
        ...state,
        border: [...state.border, action.view],
      };
    case 'TOGGLE_BORDER':
      const resetBorder = state.border.map((view) => {
        return { ...view, visible: false };
      });

      const newBorder = resetBorder.map((view) => {
        if (view.name === action.name) {
          return { ...view, visible: action.visible };
        }

        return view;
      });

      const newState = { ...state };
      if (newBorder.find((view) => view.visible)) {
        newState.border = newBorder;
      }

      return newState;
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
