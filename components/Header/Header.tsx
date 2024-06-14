"use client"
import React, { useEffect } from 'react';
import { Avatar, Badge, Box, Button, Flex, Text } from '@chakra-ui/react';
import { signIn, signOut } from 'next-auth/react';
import type { Session } from 'next-auth';
import { useTasks } from '@/contexts/TasksContext';
import { receiveMessage } from '@/services/SseService';

interface HeaderProps {
  session: Session | null;
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  const context = useTasks();
  if (!context) {
    throw new Error('TasksContext is undefined');
  }

  function onLogin() {
    signIn()
  }

  function onLogout() {
    signOut()
  }

  const isLoggedIn = session?.user

  useEffect(() => {
    const eventSource = new EventSource('/api/sse');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    eventSource.addEventListener('message', (event) => receiveMessage(event, context));

    return () => {
      eventSource.removeEventListener('message', (event) => receiveMessage(event, context));
      eventSource.close();
    };

  }, [context])

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

