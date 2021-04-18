import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const LayoutContainerDiv = styled.div`
  height: 92vh;
  position: relative;
  background: #5a535a;
  overflow: auto;
  color: white;
`;

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Navbar />
      <LayoutContainerDiv>{children}</LayoutContainerDiv>
    </>
  );
};

export default Layout;
