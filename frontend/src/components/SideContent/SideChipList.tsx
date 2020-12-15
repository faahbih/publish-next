import React from 'react';

import { useDispatch, useTrackedState } from 'store';
import SideChip, { SideChipProps } from './SideChip';
import { View } from 'containers/Types';

type SideChipListProps = {
  className: string;
  backgroundColorOnActive: string;
  onChange: (chips: SideChipProps[]) => void;
};

export default function SideChipList(props: SideChipListProps) {
  const dispatch = useDispatch();
  const state = useTrackedState();

  const getChips = () => {
    return state.border.map((view: View) => {
      return {
        label: view.name,
        active: view.visible,
        className: props.className,
        backgroundColorOnActive: props.backgroundColorOnActive,
      };
    });
  };

  const handleClick = (data: SideChipProps) => {
    dispatch({ type: 'TOGGLE_BORDER', name: data.label, visible: data.active });
  };

  return (
    <div>
      {getChips().map((chip: SideChipProps) => (
        <SideChip
          key={chip.label}
          label={chip.label}
          active={chip.active}
          className={chip.className}
          backgroundColorOnActive={chip.backgroundColorOnActive}
          onClick={handleClick}
        />
      ))}
    </div>
  );
}
