"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Box, Button, FormControl, FormLabel, Input, useToast, Heading, Link } from '@chakra-ui/react';

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.ok === false) {
      toast({
        title: 'Authentication failed',
        description: result.error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      router.push('/');
    }
  };

  return (
    <Box my={[4, 8]} textAlign="left" width={['90%', '80%', '70%', '60%', '50%']} mx="auto">
      <Heading as="h1" size="xl" mb={6}>Login</Heading>
      <form onSubmit={handleLogin} >
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='email'
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link color="teal.500" href="/forgot-password" mt={2} display="block">Forgot your password?</Link>
          <Link color="teal.500" href="/register" mt={2} display="block">Don&apos;t have an account? Register</Link>
        </FormControl>
        <Button width="full" mt={4} type="submit">
          Sign In
        </Button>
      </form>
    </Box>
  );
};
