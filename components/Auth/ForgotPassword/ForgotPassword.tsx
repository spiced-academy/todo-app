'use client';

import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast, Heading } from '@chakra-ui/react';

const ForgotPasswordComponent = ({ sendPasswordResetEmail }: { sendPasswordResetEmail: (email: string) => Promise<void> }) => {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: 'Error',
        description: "Email is required.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    await sendPasswordResetEmail(email);
    // Here you would typically make an API request to your auth service for password reset
    // For demonstration, we'll just show a toast on successful submission
    toast({
      title: 'Check your email',
      description: "If an account with that email exists, we've sent you an email with a link to reset your password.",
      status: 'info',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Box my={[4, 8]} textAlign="left" width={['90%', '80%', '70%', '60%', '50%']} mx="auto">
      <Heading as="h1" size="xl" mb={6}>Forgot Password</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='email'
            isRequired
          />
        </FormControl>
        <Button width="full" mt={4} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ForgotPasswordComponent;
