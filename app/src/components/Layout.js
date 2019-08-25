import React from "react";
import { LayoutContainer, LayoutTop, LayoutMiddle, LayoutBottom } from "./Layout.style";

export default ({ top, children, bottom }) => (
  <LayoutContainer>
    <LayoutTop>{top}</LayoutTop>
    <LayoutMiddle>{children}</LayoutMiddle>
    <LayoutBottom>{bottom}</LayoutBottom>
  </LayoutContainer>
);
