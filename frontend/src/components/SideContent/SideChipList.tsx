import React from 'react';
import SideChip, { SideChipProps } from './SideChip';

type SideChipListProps = {
  chips: SideChipProps[];
  onChange: (chips: SideChipProps[]) => void;
};

export default function SideChipList(props: SideChipListProps) {
  const [chips, setChips] = React.useState<SideChipProps[]>(props.chips);

  const handleClick = (data: SideChipProps) => {
    const newChips = chips.map((chip: SideChipProps) => {
      const isActive = chip.label === data.label && data.active;
      return { ...chip, active: isActive };
    });

    if (newChips.find((chip: SideChipProps) => chip.active)) {
      setChips(newChips);
      props.onChange(newChips);
    }
  };

  return (
    <div>
      {chips.map((chip: SideChipProps) => (
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
