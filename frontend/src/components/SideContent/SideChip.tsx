import React from 'react';
import { Chip } from '@material-ui/core';

export type SideChipProps = {
  label: string;
  active: boolean;
  className: string;
  backgroundColorOnActive: string;
  onClick?: (props: SideChipProps) => void;
};

export default function SideChip(props: SideChipProps) {
  const [active, setActive] = React.useState(props.active);

  const getStyle = (): any => {
    const styleOn = {
      backgroundColor: props.backgroundColorOnActive,
      color: '#fff',
      border: props.backgroundColorOnActive,
    };

    return props.active ? styleOn : {};
  };

  const internalHandleClick = () => {
    let newActive = !active;
    if (props.active === false && newActive === false) {
      newActive = true;
    }

    setActive(newActive);

    if (props.onClick) {
      props!.onClick({ ...props, active: newActive });
    }
  };

  return (
    <Chip
      label={props.label}
      onClick={internalHandleClick}
      variant="outlined"
      style={{
        ...getStyle(),
      }}
      className={props.className}
    />
  );
}
