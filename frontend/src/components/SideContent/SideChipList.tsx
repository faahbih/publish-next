import React from 'react';

import { useDispatch, useTrackedState } from 'store';
import SideChip, { SideChipProps } from './SideChip';
import { View, ViewType } from 'containers/Types';
import { filter } from 'store/utils';

type SideChipListProps = {
  viewType: ViewType;
  className: string;
  backgroundColorOnActive: string | { [name: string]: string };
};

export default function SideChipList(props: SideChipListProps) {
  const dispatch = useDispatch();
  const state = useTrackedState();

  const getBackgroundColor = (name: string) => {
    let backgroundColorOnActive = '';

    if (typeof props.backgroundColorOnActive === 'string') {
      backgroundColorOnActive = props.backgroundColorOnActive;
    } else if (props.backgroundColorOnActive.hasOwnProperty(name)) {
      backgroundColorOnActive = props.backgroundColorOnActive[name];
    }

    return backgroundColorOnActive;
  };

  const getChips = (): SideChipProps[] => {
    return filter(state, props.viewType).map((view: View) => {
      return {
        label: view.name,
        active: view.visible,
        tooltip: view.description,
        className: props.className,
        backgroundColorOnActive: getBackgroundColor(view.name),
      };
    });
  };

  const handleClick = (data: SideChipProps) => {
    dispatch({
      type: 'TOGGLE_VIEW',
      viewType: props.viewType,
      name: data.label,
      visible: data.active,
    });
  };

  return (
    <div>
      {getChips().map((chip: SideChipProps) => (
        <SideChip
          key={chip.label}
          label={chip.label}
          active={chip.active}
          tooltip={chip.tooltip}
          className={chip.className}
          backgroundColorOnActive={chip.backgroundColorOnActive}
          onClick={handleClick}
        />
      ))}
    </div>
  );
}
