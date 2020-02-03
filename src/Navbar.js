import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import logo from './logo.png';

const Navbar = () => (
  <Menu icon borderless>
    <Menu.Item content={<Image src={logo} size="small" />} />
    <Menu.Menu position="right">
      <Menu.Item icon="home" />
      <Menu.Item icon="search" />
      <Menu.Item icon="images" />
      <Menu.Item icon="shutdown" onClick={() => window.close()} />
    </Menu.Menu>
  </Menu>
);

export default Navbar;
