import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';
import logo from '../logo.png';

const Navbar = () => (
  <Menu className="navbar" icon borderless>
    <Menu.Item content={<Image src={logo} size="small" />} as={Link} to="/" />
    <Menu.Menu position="right" className="pr-2">
      <Menu.Item icon="home" as={Link} to="/" />
      <Menu.Item icon="search" as={Link} to="/search" />
      <Menu.Item icon="random" as={Link} to="/random" />
      <Menu.Item icon="heart outline" as={Link} to="/likes" />
      <Menu.Item icon="help circle" as="a" href="http://www.tcmhack.in/contact-us" target="_blank" />
      <Menu.Item icon="shutdown" onClick={() => window.close()} />
    </Menu.Menu>
  </Menu>
);

export default Navbar;
