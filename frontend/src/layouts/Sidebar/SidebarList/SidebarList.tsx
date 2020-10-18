import React from 'react';

import { List } from '@material-ui/core';
import LayersIcon from '@material-ui/icons/Layers';
import MapIcon from '@material-ui/icons/Map';

import SidebarItem from './SidebarItem';

function SidebarList() {
  return (
    <List>
      <SidebarItem text="Views" icon={LayersIcon}></SidebarItem>
      <SidebarItem text="Legend" icon={MapIcon}></SidebarItem>
    </List>
  );
}

export default SidebarList;
