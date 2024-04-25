"use client"
import { Box, useToast, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

export const ResetPasswordComponent = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!password.trim() || !confirmPassword.trim()) {
        toast({
          title: 'Error',
          description: "All fields are required.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      if (password !== confirmPassword) {
        toast({
          title: 'Error',
          description: "Passwords do not match.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      // Here you would typically make an API request to your auth service for password reset
      // For demonstration, we'll just show a toast on successful submission
      toast({
        title: 'Success',
        description: "Your password has been reset successfully.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    };

    return (
      <Box my={[4, 8]} textAlign="left" width={['90%', '80%', '70%', '60%', '50%']} mx="auto">
        <Heading as="h1" size="xl" mb={6}>Reset Password</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Confirm New Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isRequired
            />
          </FormControl>
          <Button width="full" mt={4} type="submit">
            Reset Password
          </Button>
        </form>
      </Box>
    );
  };

  export default ResetPasswordComponent;

