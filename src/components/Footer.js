import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';

const Footer = () => (
  <Segment className="mt-2px footer flex-item">
    <span>
      <Icon name="copyright outline" />
      2018 - {new Date().getFullYear()}{' '}
      <a href="http://www.tcmhack.in" className="text-white" target="_blank" rel="noopener noreferrer">
        TCMHACK
      </a>
    </span>
    <span>
      Made with <Icon name="heart" color="pink" /> at Jaipur
    </span>
  </Segment>
);

export default Footer;
