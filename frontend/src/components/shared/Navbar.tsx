import { useApolloClient } from '@apollo/client';
import NextLink from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useGetCurrentUserQuery, useLogoutMutation } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';

const NavbarContainerDiv = styled.div`
  height: 8vh;
  background: #6262b4;
`;

const NavbarHeader = styled.h2`
  cursor: pointer;
  margin-left: 15px;
  position: relative;
  bottom: 5px;
  color: white;
`;

const NavbarBox = styled.div`
  margin-left: auto;
  margin-top: 15px;
`;

const NavbarLink = styled.span`
  font-size: 1.3rem;
  margin-right: 10px;
  cursor: pointer;
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;

const FlexDiv = styled.div`
  display: flex;
`;

const Navbar: React.FC<{}> = () => {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useGetCurrentUserQuery({ skip: isServer() });

  let navbarBody = null;

  if (!loading && !data?.getCurrentUser) {
    navbarBody = (
      <>
        <NextLink href="/login">
          <NavbarLink>Login</NavbarLink>
        </NextLink>
        <NextLink href="/register">
          <NavbarLink>Register</NavbarLink>
        </NextLink>
      </>
    );
  } else {
    navbarBody = (
      <>
        <NavbarLink
          onClick={async (e) => {
            e.preventDefault();
            await logout();
            await apolloClient.resetStore();
          }}
        >
          Logout
        </NavbarLink>
      </>
    );
  }

  return (
    <NavbarContainerDiv>
      <FlexDiv>
        <NextLink href="/">
          <NavbarHeader>IDev</NavbarHeader>
        </NextLink>
        <NavbarBox>{navbarBody}</NavbarBox>
      </FlexDiv>
    </NavbarContainerDiv>
  );
};

export default Navbar;
