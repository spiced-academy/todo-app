"use client"
import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Box, Button, Flex, Text } from '@chakra-ui/react';
import { signIn, signOut } from 'next-auth/react';
import type { Session } from 'next-auth';

interface HeaderProps {
  session: Session | null;
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  const [unreadMessages, setUnreadMessages] = useState(0)

  function onLogin() {
    signIn()
  }

  function onLogout() {
    signOut()
  }

  const isLoggedIn = session?.user

  useEffect(() => {
    const eventSource = new EventSource('/api/messages');
    function sendEvent(event: MessageEvent) {
      const unreadMessages = JSON.parse(event.data).unreadMessages
      console.log(unreadMessages)
      setUnreadMessages(unreadMessages)
    }

    eventSource.addEventListener('message', sendEvent);

    return () => {
      eventSource.removeEventListener('message', sendEvent);
    };

  }, [])

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
            <Box as="a" href="/profile" mr={4}>
              <Box position="relative">
                <Avatar name={session?.user?.name || ""} src={session?.user?.image || ""} />
                <Badge colorScheme="red" position="absolute" top="0" right="0" variant="solid" borderRadius="full">
                  {unreadMessages > 0 ? unreadMessages : ''}
                </Badge>
              </Box>
            </Box>
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

