import React from 'react';
import './navLink.scss';

// define a Navigation Link type for our links
export type NavLink = {
  name: string;
  id: string;
  selectedId: string
  updateId: (arg: string) => void
};

const AppHeaderNavLink: React.FC<NavLink> = React.memo(({ name, id, selectedId, updateId}) => (
  <span onClick={() => updateId(id)} className={"nav-link" + (id === selectedId ? " active" : "")}>{name}</span>
));

export default AppHeaderNavLink;