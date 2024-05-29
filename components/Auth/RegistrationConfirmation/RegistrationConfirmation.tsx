'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Text, Button } from '@chakra-ui/react';
import { User } from "@prisma/client";

type ConfirmRegistrationFunc = (email: string, token: string) => Promise<User>;

interface RegistrationConfirmationProps {
  confirmRegistration: ConfirmRegistrationFunc;
}

const RegistrationConfirmation: React.FC<RegistrationConfirmationProps> = ({ confirmRegistration }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  let success = false;

  try {
    confirmRegistration(email || '', token || '');
    success = true;
  } catch (error) {
    console.error(error);
  }

  return (
    <Box textAlign="center" py={10} px={6}>
      {success ? (
        <>
          <Text fontSize="2xl" mt={0} mb={2}>
            Registration Confirmed!
          </Text>
          <Text fontSize="xl">
            Your email has been successfully verified. You can now use all the features of our application.
          </Text>
          <Button colorScheme="teal" size="lg" mt={6} onClick={() => router.push('/login')}>
            Go to Login
          </Button>
        </>
      ) : (
        <>
          <Text fontSize="2xl" mt={0} mb={2}>
            Registration Confirmation Failed
          </Text>
          <Text fontSize="xl">
            There was an issue confirming your registration. Please try the link in your email again or contact support if the problem persists.
          </Text>
          <Button colorScheme="red" size="lg" mt={6} onClick={() => router.push('/')}>
            Return Home
          </Button>
        </>
      )}
    </Box>
  );
};

export default RegistrationConfirmation;
