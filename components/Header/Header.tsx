"use client"
import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';

interface HeaderProps {
  username: string | null;
//   isLoggedIn: boolean;
//   onLogin: () => void;
//   onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ username}) => {
    const {data: session, status} = useSession()

    if (status === "loading") {
        return <div>Loading...</div>
    }
    console.log(session);
    

    function onLogin() {
        signIn()
    }

    function onLogout() {
        signOut()
    }

    const isLoggedIn = status === "authenticated"

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
      <Flex align="center" mr={5}>
        <Text fontSize="lg" fontWeight="bold">
          MyApp
        </Text>
      </Flex>

      <Box display="flex" alignItems="center">
        {isLoggedIn ? (
          <>
            <Text mr={4}>Welcome, {username}</Text>
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

