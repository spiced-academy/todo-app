"use client"
import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { signIn, signOut } from 'next-auth/react';
import type { Session } from 'next-auth';

interface HeaderProps {
  session: Session | null;
}

const Header: React.FC<HeaderProps> = ({ session }) => {

  function onLogin() {
    signIn()
  }

  function onLogout() {
    signOut()
  }

  const isLoggedIn = session?.user

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
      <Flex align="center" mr={5}>
        <Text fontSize="lg" fontWeight="bold">
          Task Tango
        </Text>
      </Flex>

      <Box display="flex" alignItems="center">
        {isLoggedIn ? (
          <>
            <Text mr={4}>Welcome, {session?.user?.name}</Text>
            <Button onClick={onLogout} bg="transparent" border="1px">
              Logout
            </Button>
          </>
        ) : (
          <Button onClick={onLogin} bg="transparent" border="1px">
            Login
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Header;

