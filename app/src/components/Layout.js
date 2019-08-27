import React from 'react';
import PropTypes from 'prop-types';
import {
  LayoutContainer, LayoutTop, LayoutMiddle, LayoutBottom,
} from './Layout.style';

const Layout = ({ top, children, bottom }) => (
  <LayoutContainer>
    <LayoutTop>{top}</LayoutTop>
    <LayoutMiddle>{children}</LayoutMiddle>
    <LayoutBottom>{bottom}</LayoutBottom>
  </LayoutContainer>
);

Layout.propTypes = {
  top: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  bottom: PropTypes.node.isRequired,
};

export default Layout;
