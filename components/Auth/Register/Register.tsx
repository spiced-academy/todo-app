"use client";

import { Box, Button, FormControl, FormLabel, Input, useToast, Heading, Link } from '@chakra-ui/react'; // Added Link import
import { User } from '@prisma/client';
import { useState } from 'react';

interface RegistrationComponentProps {
  createUser: (email: string, password: string, name?: string) => Promise<User | null>;
}

const RegisterComponent = ({ createUser }: RegistrationComponentProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Email state remains as is but will be treated as mandatory in validation
  const [password, setPassword] = useState(''); // Password state remains as is but will be treated as mandatory in validation
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm Password state remains as is but will be treated as mandatory in validation
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if email, password, or confirmPassword fields are empty
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast({
        title: 'Error.',
        description: "Email, password, and password confirmation are required.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: 'Error.',
        description: "Passwords do not match.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    try {
      await createUser(email, password, name);
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error.',
        description: `Error creating user: ${error instanceof Error ? error.message : error}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box my={[4, 8]} textAlign="left" width={['90%', '80%', '70%', '60%', '50%']} mx="auto">
      <Heading as="h1" size="xl" mb={6}>Registration</Heading> {/* Added heading for registration */}
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Name</FormLabel> {/* Changed Username to Name */}
          <Input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /> {/* Enabled autocompletion for name field */}
        </FormControl>
        <FormControl isRequired mt={4}> {/* Made email FormControl mandatory */}
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} isRequired autoComplete="email" />
        </FormControl>
        <FormControl isRequired mt={4}> {/* Made password FormControl mandatory */}
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} isRequired />
        </FormControl>
        <FormControl isRequired mt={4}> {/* Made confirm password FormControl mandatory */}
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} isRequired />
        </FormControl>
        <Button width="full" mt={4} type="submit">
          Register
        </Button>
        <Box textAlign="center" mt={4}>
          <Link href="/login" color="teal.500">Already have an account? Login</Link> {/* Added login link */}
        </Box>
      </form>
    </Box>
  );
};

export default RegisterComponent;
